import styled from "styled-components";
import { useAvailability } from "./useAvailability";
import FormRowVertical from "../../ui/FormRowVertical";
import { useEffect } from "react";

import { motion, useAnimation } from "framer-motion";
import { useDarkMode } from "../../hooks/useDarkMode";
import { HiOutlineClock } from "react-icons/hi2";

// props for the message component
// const color = {
//   red: css`
//     background-color: var(--color-red-100);
//     color: var(--color-red-700);
//     text-shadow: 2px 2px 2px var(--color-red-100);
//   `,
//   grey: css`
//     background-color: var(--color-grey-50);
//     color: var(--color-grey-500);
//     text-shadow: 2px 2px 2px var(--color-grey-100);
//   `,

//   yellow: css`
//     background-color: var(--color-yellow-100);
//     color: var(--color-yellow-700);
//     text-shadow: 2px 2px 2px var(--color-yellow-100);
//   `,
//   green: css`
//     background-color: var(--color-green-100);
//     color: var(--color-green-700);
//     text-shadow: 2px 2px 2px var(--color-green-100);
//   `,
// };

const colorMapping = {
  theme: {
    light: {
      backgroundColor: {
        grey: "#f9fafb",
        red: "#fee2e2",
        yellow: "#fef9c3",
        green: "#dcfce7",
      },
      textColor: {
        grey: "#6b7280",
        red: "#b91c1c",
        yellow: "#a16207",
        green: "#15803d",
      },
      textShadow: {
        grey: "#f3f4f6",
        red: "#fee2e2",
        yellow: "#fef9c3",
        green: "#dcfce7",
      },
    },
    dark: {
      backgroundColor: {
        grey: "#111827",
        red: "#991b1b",
        yellow: "#854d0e",
        green: "#166534",
      },
      textColor: {
        grey: "#9ca3af",
        red: "#fee2e2",
        yellow: "#fef9c3",
        green: "#dcfce7",
      },
      textShadow: {
        grey: "#1f2937",
        red: "#fee2e2",
        yellow: "#854d0e",
        green: "#dcfce7",
      },
    },
  },
};

const Message = styled(motion.div)`
  padding: 1.6rem 2.4rem;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-100);
  font-weight: 500;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  gap: 1.2rem;
  background-color: var(--color-grey-50);

  & :has(svg) {
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    text-align: center;
  }
`;

function MessageAvailable({ cabinIdInput, startDateInput, endDateInput }) {
  const { availability } = useAvailability(
    cabinIdInput,
    startDateInput,
    endDateInput
  );
  const { message, color, Icon } = availability;
  const { isDarkMode } = useDarkMode();

  const controls = useAnimation();
  const iconControls = useAnimation();

  useEffect(() => {
    const mode = isDarkMode ? "dark" : "light";
    const backgroundColor = colorMapping.theme[mode].backgroundColor[color];
    const textColor = colorMapping.theme[mode].textColor[color];
    const textShadowColor = colorMapping.theme[mode].textShadow[color];

    if (Icon === HiOutlineClock) {
      controls.start({
        transition: { duration: 0.5, type: "tween" },
        backgroundColor: backgroundColor,
        color: textColor,
        textShadow: textShadowColor,
      });
    } else {
      controls.start({
        scale: [1, 1.14, 1],
        transition: { duration: 0.5, type: "tween" },
        backgroundColor: backgroundColor,
        color: textColor,
        textShadow: textShadowColor,
      });
    }

    if (color === "grey") {
      iconControls.start({
        scale: [1, 1.5],
        rotate: [0, 360],

        transition: {
          type: "spring",
          duration: 2,
          repeat: Infinity,
          delay: 0.8,
          repeatDelay: 0.8,
        },
      });
    }

    if (color === "grey" && Icon === HiOutlineClock) {
      iconControls.start({
        scale: [1, 1.8],
        rotate: [0, 360],


        transition: {
          type: "spring",
          duration: 2,
          repeat: Infinity,
          delay: 0,
          repeatDelay: 1,
          stiffness: 70,
        },
      });
    }

    if (color === "red") {
      iconControls.start({
        scale: [1, 1.7],
        rotate: [0, 360],
        transition: { duration: 2.5, delay: 0.5, type: "spring" },
      });
    }

    if (color === "yellow") {
      iconControls.start({
        scale: [1, 1.5],
        rotate: [0, 360],
        transition: { duration: 2, delay: 0.5, type: "spring" },
      });
    }

    if (color === "green") {
      iconControls.start({
        scale: [1, 1.7, 1.9],
        rotate: [0, 360],
        transition: { duration: 2.5, delay: 0.5, type: "spring", stiffness: 60 },
      });
    }
  }, [controls, iconControls, isDarkMode, color, Icon]);

  return (
    <FormRowVertical>
      <Message animate={controls}>
        {Icon && (
          <motion.div animate={iconControls}>
            <Icon />
          </motion.div>
        )}

        {message}
      </Message>
    </FormRowVertical>
  );
}

export default MessageAvailable;
