import React from "react";
import Icon from "./Icon";

const Steps = React.memo(({ currentStep = 1, steps = [], className = "" }) => {
  if (!steps.length) return null;

  return (
    <div className={`w-full mb-20 ${className}`}>
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <React.Fragment key={step}>
              {/* Step item */}
              <div className="flex flex-column items-center z-10">
                <div
                  className="rounded-full flex items-center justify-center font-600 transition-all"
                  style={{
                    width: 32,
                    height: 32,
                    fontSize: 12,
                    backgroundColor: isCompleted
                      ? "var(--primary)"
                      : isCurrent
                      ? "var(--primary)"
                      : "var(--tertiary, #edf2f7)",
                    color: isCompleted || isCurrent ? "#fff" : "var(--gray, #718096)",
                    boxShadow: isCurrent ? "0 0 0 4px rgba(219, 94, 31, 0.2)" : "none"
                  }}
                >
                  {isCompleted ? (
                    <Icon name="Check" width="14" height="14" stroke="#fff" strokeWidth="3" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className="mini-text mt-6 font-500 text-center select-none"
                  style={{
                    fontSize: 11,
                    color: isCurrent
                      ? "var(--primary)"
                      : isCompleted
                      ? "var(--dark)"
                      : "var(--gray)",
                    fontWeight: isCurrent ? 600 : 400
                  }}
                >
                  {step}
                </span>
              </div>

              {/* Connecting line between steps */}
              {index < steps.length - 1 && (
                <div
                  className="flex-1 mx-8"
                  style={{
                    height: 2,
                    backgroundColor: stepNumber < currentStep ? "var(--primary)" : "#e2e8f0",
                    marginTop: -20,
                    transition: "background-color 0.3s ease"
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
});

Steps.displayName = "Steps";

export default Steps;
