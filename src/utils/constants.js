export const PAGE_SIZE = 10;

export const screenSizes = {
  mobile: "320px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "2560px",
};

export const windowSizes = {
  mobile: 320,
  tablet: 768,
  laptop: 1024,
  desktop: 2560,
};

export const COUNTRY_MAX_LENGTH = 15;

export const modifiersStylesDatePicker = {
  create: {
    booked: {
      color: "var(--color-grey-400)",
      opacity: 0.5,
    },
    today: {
      color: "var(--color-yellow-700)",
      fontSize: "1.8rem",
      backgroundColor: "var(--color-yellow-100)",
    },
  },

  edit: {
    booked: {
      color: "var(--color-grey-400)",
      pointerEvents: "none",
      opacity: 0.5,
    },
    today: {
      color: "var(--color-yellow-700)",
      fontSize: "1.8rem",
      backgroundColor: "var(--color-yellow-100)",
    },
  },
};
