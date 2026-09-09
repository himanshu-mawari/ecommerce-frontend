import React from "react";

const EmptyState = ({
  icon: Icon,
  title,
  description,
  tone = "neutral",
  layout = "vertical",
}) => {
  // Styles mapping based on tone
  const toneStyles = {
    neutral: {
      iconBg: "bg-gray-100",
      iconColor: "text-gray-400",
      titleColor: "text-gray-900",
      descColor: "text-gray-500",
    },
    positive: {
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      titleColor: "text-emerald-950",
      descColor: "text-emerald-700/80",
    },
    info: {
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      titleColor: "text-indigo-950",
      descColor: "text-indigo-700/80",
    },
  };

  const style = toneStyles[tone] || toneStyles.neutral;

  if (layout === "horizontal") {
    return (
      <div className={`flex items-center gap-3 p-4 ${style.container}`}>
        <div className={`p-2 rounded-lg shrink-0 ${style.iconBg}`}>
          <Icon className={`size-6 ${style.iconColor}`} />
        </div>
        <div className="text-left">
          <p className={`text-sm font-semibold ${style.titleColor}`}>{title}</p>
          <p className={`text-xs ${style.descColor}`}>{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center py-8 px-4 text-center ${style.container}`}
    >
      <div className={`p-2.5 rounded-full mb-3 ${style.iconBg}`}>
        <Icon className={`size-7 ${style.iconColor}`} />
      </div>
      <p className={`text-sm font-semibold ${style.titleColor}`}>{title}</p>
      <p className={`text-xs mt-1 max-w-xs ${style.descColor}`}>
        {description}
      </p>
    </div>
  );
};
export default EmptyState;
