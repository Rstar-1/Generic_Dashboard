import React, { useState, useCallback, useMemo, memo } from "react";
import MainLayout from "../../components/layout/sections/MainLayout";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Fields from "../../components/forms/Fields";
import { showToast } from "../../components/common/Toast";

// Data and table column definitions from apiData.js
import {
    tasksSidebarData,
    tasksTableColumns,
    tasksData as initialTasksData,
} from "../../utils/apiData";

// Tabs for task management
const TABS = [
    { name: "All Tasks", value: "all" },
    { name: "High Priority", value: "Admin" },
    { name: "Medium Priority", value: "User" },
    { name: "Low Priority", value: "Member" },
];

const SIDEBAR_TO_TAB = {
    "All Tasks": "all",
    "High Priority": "Admin",
    "Medium Priority": "User",
    "Low Priority": "Member",
};

// Memoized Filter Drawer Content
const FilterDrawerContent = memo(({ tagFilter, setTagFilter }) => {
    const tagOptions = useMemo(
        () => [
            { label: "All Categories", value: "all" },
            { label: "Frontend", value: "Frontend" },
            { label: "Security & RBAC", value: "Security" },
            { label: "DevOps & Cloud", value: "DevOps" },
            { label: "Payments & API", value: "Payments" },
            { label: "Database", value: "Database" },
        ],
        []
    );

    return (
        <div className="grid-cols-3 gap-12">
            <Fields
                type="select"
                label="Module Filter"
                options={tagOptions}
                value={tagFilter}
                onChange={setTagFilter}
            />
        </div>
    );
});
FilterDrawerContent.displayName = "FilterDrawerContent";

const Tasks = () => {
    const [tasks, setTasks] = useState(initialTasksData);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("All Tasks");
    const [searchQuery, setSearchQuery] = useState("");
    const [tagFilter, setTagFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Sidebar items with dynamic task count calculations
    const sidebarItems = useMemo(() => {
        return tasksSidebarData.items.map((item) => {
            let count = tasks.length;
            if (item.priority !== "all") {
                count = tasks.filter((t) => t.priority === item.priority).length;
            }
            return { ...item, count, icon: "Clipboard" };
        });
    }, [tasks]);

    // Handlers wrapped in useCallback
    const handleSidebarItemClick = useCallback((name) => {
        setSelectedCategory(name);
        setCurrentPage(1);
        const mappedTab = SIDEBAR_TO_TAB[name] || "all";
        setActiveTab(mappedTab);
    }, []);

    const handleTabChange = useCallback((tabValue) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
        const foundEntry = Object.entries(SIDEBAR_TO_TAB).find(([, val]) => val === tabValue);
        if (foundEntry) setSelectedCategory(foundEntry[0]);
        else setSelectedCategory("All Tasks");
    }, []);

    const handleSearchChange = useCallback((value) => {
        setSearchQuery(value);
        setCurrentPage(1);
    }, []);

    const handlePageChange = useCallback((newPage) => {
        setCurrentPage(newPage);
    }, []);

    const handleClearFilters = useCallback(() => {
        setTagFilter("all");
        setSearchQuery("");
        setCurrentPage(1);
        showToast("Task filters cleared", "info");
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

    const handleCreateTask = useCallback(() => {
        showToast("Create Task dialog initialized!", "success");
    }, []);

    const handleExportTasks = useCallback(() => {
        navigator.clipboard?.writeText(JSON.stringify(tasks, null, 2));
        showToast("Task backlog exported to clipboard!", "success");
    }, [tasks]);

    // Filter and paginate data
    const filteredTasks = useMemo(() => {
        return tasks.filter((item) => {
            // Tab / Category filter
            const matchesTab = activeTab === "all" || item.priority === activeTab;

            // Tag filter
            const matchesTag =
                tagFilter === "all" ||
                (Array.isArray(item.tags) && item.tags.some((t) => t.toLowerCase().includes(tagFilter.toLowerCase())));

            // Search query filter
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch =
                !q ||
                item.title.toLowerCase().includes(q) ||
                item.id.toLowerCase().includes(q) ||
                (item.assignee?.name && item.assignee.name.toLowerCase().includes(q));

            return matchesTab && matchesTag && matchesSearch;
        });
    }, [tasks, activeTab, tagFilter, searchQuery]);

    const paginatedTasks = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredTasks.slice(start, start + itemsPerPage);
    }, [filteredTasks, currentPage, itemsPerPage]);

    const hasActiveFilters = useMemo(
        () => tagFilter !== "all" || searchQuery !== "",
        [tagFilter, searchQuery]
    );

    const filterInputsNode = useMemo(
        () => <FilterDrawerContent tagFilter={tagFilter} setTagFilter={setTagFilter} />,
        [tagFilter]
    );

    const quickActionNode = useMemo(
        () => (
            <div className="flex items-center gap-8">
                <Button
                    text="Export Tasks"
                    version="v2"
                    bg="white"
                    color="dark"
                    border="tertiary"
                    icon="FileText"
                    onClick={handleExportTasks}
                    title="Export task list to JSON"
                />
                <Button
                    text="New Task"
                    version="v2"
                    bg="primary"
                    color="white"
                    icon="Plus"
                    onClick={handleCreateTask}
                    title="Create a new task item"
                />
            </div>
        ),
        [handleExportTasks, handleCreateTask]
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
            <div>
                <Table
                    title="Task Backlog & Assignments"
                    subtitle="Track sprint progress, deliverables, and team member assignments"
                    data={paginatedTasks}
                    columns={tasksTableColumns}
                    totalItems={filteredTasks.length}
                    itemsPerPage={itemsPerPage}
                    page={currentPage}
                    onPageChange={handlePageChange}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    searchPlaceholder="Search task by title, ID, or assignee..."
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
            </div>
        </MainLayout>
    );
};

export default memo(Tasks);
