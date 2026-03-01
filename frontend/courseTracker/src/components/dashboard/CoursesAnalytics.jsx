import React from "react";

const CoursesAnalytics = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const bars = [
    { x: 20,  y: 40, w: 45, h: 80, fill: "url(#diagonalStripes)" },
    { x: 80,  y: 0,  w: 45, h: 120, fill: "#14532d" },
    { x: 140, y: 60, w: 45, h: 60,  fill: "#a3c2a6" },
    { x: 200, y: 40, w: 45, h: 80, fill: "#1a6d3b" },
    { x: 260, y: 40, w: 45, h: 80, fill: "url(#diagonalStripes)" },
    { x: 320, y: 20, w: 45, h: 100, fill: "url(#diagonalStripes)" },
    { x: 380, y: 20, w: 45, h: 100, fill: "#14532d" },
  ];

  const svgW = 460;     
  const svgH = 160;     
  const labelY = 140;

  return (
    <section className=" col-span-12 mdd:col-span-12 lg:col-span-5 xl:col-span-6 bg-[#ffffff] px-4 rounded-xl">
      <div>
        <h4 className="py-4 font-raleway text-[18px] font-semibold">Course Analytics</h4>

        <svg
          className="w-full block"
          viewBox={`0 0 ${svgW} ${svgH}`}
          preserveAspectRatio="xMinYMin meet">
          <defs>
            <pattern
              id="diagonalStripes"
              patternUnits="userSpaceOnUse"
              width="8"
              height="8"
              patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#14532d" strokeWidth="3" />
            </pattern>
          </defs>

          {/* Bars */}
          {bars.map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx={20} fill={b.fill} />
          ))}

          {days.map((d, i) => {
            const b = bars[i];
            const centerX = b.x + b.w / 2;
            return (
              <text
                key={d + i}
                x={centerX}
                y={labelY}
                textAnchor="middle"
                fontSize="12"
                fill="#111827">
                {d}
              </text>
            );
          })}
        </svg>
      </div>
    </section>
  );
};

export default CoursesAnalytics;