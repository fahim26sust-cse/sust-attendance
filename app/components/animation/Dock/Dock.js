"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "@/app/components/animation/Dock/Dock.css";

function DockItem({
  children,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}) {
  const ref = useRef(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) =>
        cloneElement(child, { isHovered })
      )}
    </motion.div>
  );
}

function DockLabel({ children, className = "", ...rest }) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`dock-label ${className}`}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = "" }) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  dockHeight = 256,
  baseItemSize = 50,
    panelRadius, 
  itemRadius,  
  gap,
}) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);
  const toPx = (v) => (typeof v === 'number' ? `${v}px` : v);
  const toRem = (v) => (typeof v === 'number' ? `${v}rem` : v);  
  return (
    <motion.div
      style={{ height, scrollbarWidth: "none" }}
      className="dock-outer"
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`dock-panel ${className}`}
        style={{
          height: panelHeight,
          ...(panelRadius ? { ['--dock-panel-radius']: toPx(panelRadius) } : {}),
          ...(itemRadius  ? { ['--dock-item-radius'] : toPx(itemRadius) }  : {}),
          ...(gap    ? { ['--dock-gap']        : toRem(gap) }    : {}), // NEW
        }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}


// "use client";

// import {
//   motion,
//   useMotionValue,
//   useSpring,
//   useTransform,
//   AnimatePresence,
// } from "framer-motion";
// import {
//   Children,
//   cloneElement,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";

// import "@/app/components/animation/Dock/Dock.css";

// function DockItem({
//   children,
//   className = "",
//   onClick,
//   mouseX,
//   spring,
//   distance,
//   magnification,
//   baseItemSize,
// }) {
//   const ref = useRef(null);
//   const isHovered = useMotionValue(0);

//   const mouseDistance = useTransform(mouseX, (val) => {
//     const rect = ref.current?.getBoundingClientRect() ?? {
//       x: 0,
//       width: baseItemSize,
//     };
//     return val - rect.x - baseItemSize / 2;
//   });

//   const targetSize = useTransform(
//     mouseDistance,
//     [-distance, 0, distance],
//     [baseItemSize, magnification, baseItemSize]
//   );
//   const size = useSpring(targetSize, spring);

//   return (
//     <motion.div
//       ref={ref}
//       style={{ width: size, height: size }}
//       onHoverStart={() => isHovered.set(1)}
//       onHoverEnd={() => isHovered.set(0)}
//       onFocus={() => isHovered.set(1)}
//       onBlur={() => isHovered.set(0)}
//       onClick={onClick}
//       className={`dock-item ${className}`}
//       tabIndex={0}
//       role="button"
//       aria-haspopup="true"
//     >
//       {Children.map(children, (child) => cloneElement(child, { isHovered }))}
//     </motion.div>
//   );
// }

// function DockLabel({ children, className = "", ...rest }) {
//   const { isHovered } = rest;
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const unsubscribe = isHovered.on("change", (latest) => {
//       setIsVisible(latest === 1);
//     });
//     return () => unsubscribe();
//   }, [isHovered]);

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.div
//           initial={{ opacity: 0, y: 0 }}
//           animate={{ opacity: 1, y: -10 }}
//           exit={{ opacity: 0, y: 0 }}
//           transition={{ duration: 0.2 }}
//           className={`dock-label ${className}`}
//           role="tooltip"
//           style={{ x: "-50%" }}
//         >
//           {children}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// function DockIcon({ children, className = "" }) {
//   return <div className={`dock-icon ${className}`}>{children}</div>;
// }

// export default function Dock({
//   items,
//   className = "",
//   spring = { mass: 0.1, stiffness: 150, damping: 12 },
//   magnification = 70,
//   distance = 200,
//   panelHeight = 68,
//   dockHeight = 256,
//   baseItemSize = 50,

//   // NEW: responsive controls
//   responsiveBreakpoint = 640, // px
//   rowsWhenNarrow = 2,
//   rowGap = 12, // px between rows
// }) {
//   const mouseX = useMotionValue(Infinity);
//   const isHovered = useMotionValue(0);

//   // Determine if we should switch to multi-row layout
//   const [isNarrow, setIsNarrow] = useState(false);
//   useEffect(() => {
//     const update = () => setIsNarrow(window.innerWidth < responsiveBreakpoint);
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, [responsiveBreakpoint]);

//   const rowCount = isNarrow ? rowsWhenNarrow : 1;

//   // Split items across rows (balanced)
//   const rows = useMemo(() => {
//     if (rowCount <= 1) return [items];
//     const perRow = Math.ceil(items.length / rowCount);
//     const out = [];
//     for (let i = 0; i < rowCount; i++) {
//       out.push(items.slice(i * perRow, (i + 1) * perRow));
//     }
//     return out;
//   }, [items, rowCount]);

//   // Calculate container height (animated) so the dock expands smoothly on hover
//   const maxHeight = useMemo(
//     () => Math.max(dockHeight, magnification + magnification / 2 + 4),
//     [magnification, dockHeight]
//   );

//   const baseHeight = rowCount * panelHeight + (rowCount - 1) * rowGap;
//   const expandedHeight = rowCount * maxHeight + (rowCount - 1) * rowGap;

//   const heightRow = useTransform(isHovered, [0, 1], [baseHeight, expandedHeight]);
//   const height = useSpring(heightRow, spring);

//   return (
//     <motion.div style={{ height, scrollbarWidth: "none" }} className="dock-outer">
//       {rows.map((rowItems, rowIndex) => {
//         // Position rows from the bottom up so the last row sits closest to the edge
//         const bottomOffsetPx =
//           8 + (rowCount - rowIndex - 1) * (panelHeight + rowGap); // 8px ≈ 0.5rem

//         return (
//           <motion.div
//             key={`dock-row-${rowIndex}`}
//             onMouseMove={({ pageX }) => {
//               isHovered.set(1);
//               mouseX.set(pageX);
//             }}
//             onMouseLeave={() => {
//               isHovered.set(0);
//               mouseX.set(Infinity);
//             }}
//             className={`dock-panel ${className}`}
//             style={{ height: panelHeight, bottom: bottomOffsetPx }}
//             role="toolbar"
//             aria-label={
//               rowCount > 1 ? `Application dock row ${rowIndex + 1}` : "Application dock"
//             }
//           >
//             {rowItems.map((item, index) => (
//               <DockItem
//                 key={`${rowIndex}-${index}`}
//                 onClick={item.onClick}
//                 className={item.className}
//                 mouseX={mouseX}
//                 spring={spring}
//                 distance={distance}
//                 magnification={magnification}
//                 baseItemSize={baseItemSize}
//               >
//                 <DockIcon>{item.icon}</DockIcon>
//                 <DockLabel>{item.label}</DockLabel>
//               </DockItem>
//             ))}
//           </motion.div>
//         );
//       })}
//     </motion.div>
//   );
// }
