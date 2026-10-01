import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import { showToast } from "../../components/common/Toast";
import {
    tasksSidebarData,
    tasksTableColumns,
    tasksData as initialTasksData,
} from "../../utils/apiData";

const ITEMS_PER_PAGE = 5;
const TABS = [{ name: "All Tasks", value: "all" }];

const PRIORITY_OPTIONS = [
    { label: "All Priorities", value: "all" },
    { label: "High Priority", value: "High" },
    { label: "Medium Priority", value: "Medium" },
    { label: "Low Priority", value: "Low" },
];

const STATUS_OPTIONS = [
    { label: "All Statuses", value: "all" },
    { label: "Active Only", value: "Active" },
    { label: "Pending Only", value: "Pending" },
    { label: "Failed Only", value: "Failed" },
];

// Memoized Filter Drawer Content
const FilterDrawerContent = memo(({ priority, onPriorityChange, status, onStatusChange }) => (
    <div className="grid-cols-4 gap-12">
        <Fields
            type="select"
            label="Priority Filter"
            options={PRIORITY_OPTIONS}
            value={priority}
            onChange={onPriorityChange}
        />
        <Fields
            type="select"
            label="Status Filter"
            options={STATUS_OPTIONS}
            value={status}
            onChange={onStatusChange}
        />
    </div>
));
FilterDrawerContent.displayName = "FilterDrawerContent";

const Tasks = () => {
    const [tasks, setTasks] = useState(initialTasksData);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Tasks");
    const [searchQuery, setSearchQuery] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    // Keep tasks state synchronized when initial dataset updates
    useEffect(() => {
        setTasks(initialTasksData);
    }, [initialTasksData]);

    const handleSearchChange = useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.target?.value ?? "");
        setSearchQuery(next);
        setCurrentPage(1);
    }, []);

    const handlePriorityFilterChange = useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setPriorityFilter(next);
        setCurrentPage(1);
    }, []);

    const handleStatusFilterChange = useCallback((val) => {
        const next = typeof val === "string" ? val : (val?.value || val?.target?.value || "all");
        setStatusFilter(next);
        setCurrentPage(1);
    }, []);

    // Sidebar items with real-time dynamic count calculations
    const sidebarItems = useMemo(() => {
        const counts = tasks.reduce((acc, t) => {
            const p = t.priority?.toLowerCase();
            if (p) acc[p] = (acc[p] || 0) + 1;
            return acc;
        }, {});

        return tasksSidebarData.items.map((item) => ({
            ...item,
            icon: "Clipboard",
            count: item.priority === "all" ? tasks.length : (counts[item.priority?.toLowerCase()] || 0),
        }));
    }, [tasks]);

    // Sidebar & tab navigation handlers
    const handleSidebarItemClick = useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        const item = tasksSidebarData.items.find((i) => i.name === name);
        setActiveTab(item?.priority || "all");
    }, []);

    const handleTabChange = useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        const item = tasksSidebarData.items.find((i) => i.priority === tabValue);
        setSelectedCategory(item ? item.name : "All Tasks");
    }, []);

    const handleClearFilters = useCallback(() => {
        setPriorityFilter("all");
        setStatusFilter("all");
        setSearchQuery("");
        setCurrentPage(1);
        showToast("Task filters reset", "info");
    }, []);

    // Action handlers for rows
    const handleViewTask = useCallback((row) => {
        showToast(`Viewing details for: ${row.title}`, "info");
    }, []);

    const handleEditTask = useCallback((row) => {
        showToast(`Editing task ${row.id}`, "info");
    }, []);

    const handleDeleteTask = useCallback((row) => {
        setTasks((prev) => prev.filter((t) => t.id !== row.id));
        showToast(`Task ${row.id} completed & archived!`, "success");
    }, []);

    const handleExportTasks = useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify(tasks, null, 2));
        showToast("Task backlog exported to clipboard!", "success");
    }, [tasks]);

    // Multi-criteria filtering: sidebar priority, drawer priority, status & search
    const filteredTasks = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        const targetTab = String(activeTab || "all").toLowerCase().trim();
        const targetPriority = String(priorityFilter || "all").toLowerCase().trim();
        const targetStatus = String(statusFilter || "all").toLowerCase().trim();

        return tasks.filter((item) => {
            const itemPriority = String(item.priority || "").toLowerCase().trim();
            const itemStatus = String(item.status || "").toLowerCase().trim();

            const matchesTab = targetTab === "all" || itemPriority === targetTab;
            const matchesPriority = targetPriority === "all" || itemPriority === targetPriority;
            const matchesStatus = targetStatus === "all" || itemStatus === targetStatus;

            const matchesSearch =
                !q ||
                String(item.title || "").toLowerCase().includes(q) ||
                String(item.id || "").toLowerCase().includes(q) ||
                itemPriority.includes(q) ||
                itemStatus.includes(q) ||
                String(item.assignee?.name || "").toLowerCase().includes(q) ||
                String(item.assignee?.mobile || "").toLowerCase().includes(q);

            return matchesTab && matchesPriority && matchesStatus && matchesSearch;
        });
    }, [tasks, activeTab, priorityFilter, statusFilter, searchQuery]);

    const paginatedTasks = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredTasks.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredTasks, currentPage]);

    const hasActiveFilters = useMemo(
        () => priorityFilter !== "all" || statusFilter !== "all" || Boolean(searchQuery.trim()),
        [priorityFilter, statusFilter, searchQuery]
    );

    const filterInputsNode = useMemo(
        () => (
            <FilterDrawerContent
                priority={priorityFilter}
                onPriorityChange={handlePriorityFilterChange}
                status={statusFilter}
                onStatusChange={handleStatusFilterChange}
            />
        ),
        [priorityFilter, handlePriorityFilterChange, statusFilter, handleStatusFilterChange]
    );

    const quickActionNode = useMemo(
        () => (
            <Button
                text="Export CSV"
                version="v2"
                bg="primary"
                variant="outline"
                border="primary"
                color="white"
                icon="File"
                title="Download task backlog"
                onClick={handleExportTasks}
            />
        ),
        [handleExportTasks]
    );

    return (
        <MainLayout
            sidebarTitle={tasksSidebarData.title}
            sidebarItems={sidebarItems}
            selectedSidebarItem={selectedCategory}
            onSidebarItemClick={handleSidebarItemClick}
            headerIcon={<Icon name="Clipboard" width="18" height="18" />}
            headerTitle="Task & Sprint Management"
            headerSub="Coordinate roadmap features, engineering assignees, delivery milestones, and operational priorities"
            quickAction={quickActionNode}
            showTabControls={true}
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            filterDescription="Filter tasks by development module, urgency level, or search keyword"
            filterInputs={filterInputsNode}
            hasActiveFilters={hasActiveFilters}
            onClearAllFilters={handleClearFilters}
        >
            <Table
                title="Task Backlog & Assignments"
                subtitle="Track sprint progress, deliverables, and team member assignments"
                data={paginatedTasks}
                columns={tasksTableColumns}
                totalItems={filteredTasks.length}
                itemsPerPage={ITEMS_PER_PAGE}
                page={currentPage}
                onPageChange={setCurrentPage}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Search task by title, ID, assignee, or mobile..."
                itemName="tasks"
                collapsible={true}
                maxVisibleColumns={5}
                minWidth="1050px"
                onView={handleViewTask}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                viewTitle="View Task Details"
                editTitle="Edit Task"
                deleteTitle="Complete & Archive"
            />
        </MainLayout>
    );
};

export default memo(Tasks);
