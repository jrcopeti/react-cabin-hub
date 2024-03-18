import styled from "styled-components";
import { useAvailability } from "../features/bookings/useAvailability";
import FormRowVertical from "./FormRowVertical";
import { useEffect } from "react";
import {
  HiOutlineEllipsisHorizontalCircle,
  HiOutlineExclamationTriangle,
  HiOutlineXCircle,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import { motion, useAnimation } from "framer-motion";
import { useDarkMode } from "../context/useDarkMode";

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
        red: "#fee2e2",
        grey: "#f9fafb",
        yellow: "#fef9c3",
        green: "#dcfce7",
      },
      textColor: {
        red: "#b91c1c",
        grey: "#6b7280",
        yellow: "#a16207",
        green: "#15803d",
      },
      textShadow: {
        red: "#fee2e2",
        grey: "#f3f4f6",
        yellow: "#fef9c3",
        green: "#dcfce7",
      },
    },
    dark: {
      backgroundColor: {
        red: "#fee2e2",
        grey: "#111827",
        yellow: "#854d0e",
        green: "#166534",
      },
      textColor: {
        red: "#b91c1c",
        grey: "#9ca3af",
        yellow: "#fef9c3",
        green: "#dcfce7",
      },
      textShadow: {
        red: "#fee2e2",
        grey: "#1f2937",
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
  gap: 1rem;
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

    controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.5 },
      backgroundColor: backgroundColor,
      color: textColor,
      textShadow: textShadowColor,
    });

    if (color === "grey") {
      iconControls.start({
        scale: [1, 1.5],
        rotate: [0, 360, 360, 360, 360],

        transition: {
          type: "spring",
          duration: 2,
          repeat: Infinity,
          delay: 0.8,
          repeatDelay: 0.8,
        },
      });
    }

    if (color === "red") {
      iconControls.start({
        scale: [1, 1.7],
        rotate: [0, 360, 360, 360, 360],
        transition: { duration: 2.5, delay: 0.5, type: "spring" },
      });
    }

    if (color === "yellow") {
      iconControls.start({
        scale: [1, 1.5],
        rotate: [0, 360, 360, 360, 360],
        transition: { duration: 2, delay: 0.5, type: "spring" },
      });
    }

    if (color === "green") {
      iconControls.start({
        scale: [1, 1.7],
        rotate: [0, 360, 360, 360, 360],
        transition: { duration: 2, delay: 0.5, type: "spring" },
      });
    }
  }, [controls, iconControls, isDarkMode, color]);

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
