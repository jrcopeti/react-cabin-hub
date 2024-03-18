import { createGlobalStyle } from "styled-components";
import "react-day-picker/dist/style.css";

/* Colors adapted from https://tailwindcss.com/docs/customizing-colors */
const GlobalStyles = createGlobalStyle`


:root {

 &, &.light-mode{


  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;
  --color-brand-200: #c7d2fe;


  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);
  --backdrop-color-mobilewarning: rgba(255, 255, 255, 0.5);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

    /* For dark mode */
    --image-grayscale: 0;
  --image-opacity: 100%;



}
  &.dark-mode {

--color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;
--color-brand-200: #312e81;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);
--backdrop-color-mobilewarning: rgba(0, 0, 0, 0.5);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;


}

  /* Indigo */
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  --color-brand-900: #312e81;



  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;


}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-700);
  background-color: var(--color-grey-50);
  transition: color 0.3s, background-color 0.3s;
  min-height: 100dvh;
  line-height: 1.5;
  font-size: 1.6rem;
  -webkit-hyphens:manual;
  -moz-hyphens:manual;
  -webkit-hyphens: manual;
  hyphens:manual;

}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}


button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;


}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

/* Date Picker */

.rdp {
  --rdp-cell-size: 4rem; /* Size of the day cells. */
  --rdp-caption-font-size: 2rem; /* Font size for the caption labels. */
  --rdp-accent-color: var(--color-brand-600); /* Accent color for the background of selected days. */
  --rdp-background-color: var(--color-grey-300); /* Background color for the hovered/focused elements. */

  --rdp-outline: 2px solid var(--color-yellow-700); /* Outline border for focused elements */
  --rdp-outline-selected: 3px solid var(--color-grey-900); /* Outline border for focused _and_ selected elements */
  --rdp-selected-color: #f9fafb; /* Color of selected day text */

  /* margin: 1em; */
 margin: 2rem -0.3rem;
}



/* Hide elements for devices that are not screen readers */
.rdp-vhidden {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  background: transparent;
  border: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  position: absolute !important;
  top: 0;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  overflow: hidden !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  border: 0 !important;

}

/* Buttons */
.rdp-button_reset {
  appearance: none;
  position: relative;
  margin: 0;
  padding: 0;
  cursor: default;
  color: inherit;
  background: none;
  font: inherit;

  -moz-appearance: none;
  -webkit-appearance: none;
}

.rdp-button_reset:focus-visible {
  /* Make sure to reset outline only when :focus-visible is supported */
  outline: none;
}

.rdp-button {
  border: 2px solid transparent;
}

.rdp-button[disabled]:not(.rdp-day_selected) {
  opacity: 0.25;
}

.rdp-button:not([disabled]) {
  cursor: pointer;
}

.rdp-button:focus-visible:not([disabled]) {
  color: inherit;
  background-color: var(--rdp-background-color);
  border: var(--rdp-outline);
}

.rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
  background-color: var(--rdp-background-color);
}

.rdp-months {
  display: flex;
}

.rdp-month {
  margin: 0 1em;
}

.rdp-month:first-child {
  margin-left: 0;
}

.rdp-month:last-child {
  margin-right: 0;
}

.rdp-table {
  margin: 0;
  max-width: calc(var(--rdp-cell-size) * 7);
  border-collapse: collapse;
  box-shadow: var(--shadow-md);
  
}

.rdp-with_weeknumber .rdp-table {
  max-width: calc(var(--rdp-cell-size) * 8);
  border-collapse: collapse;
}

.rdp-caption {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  text-align: left;
  background-color: var(--color-grey-100);
  box-shadow: var(--shadow-md);
}

.rdp-multiple_months .rdp-caption {
  position: relative;
  display: block;
  text-align: center;
}

.rdp-caption_dropdowns {
  position: relative;
  display: inline-flex;
}

.rdp-caption_label {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  margin: 0;
  padding: 0 0.25em;
  white-space: nowrap;
  color: currentColor;
  border: 0;
  border: 2px solid transparent;
  font-family: inherit;
  font-size: var(--rdp-caption-font-size);
  font-weight: bold;
}

.rdp-nav {
  white-space: nowrap;
}

.rdp-multiple_months .rdp-caption_start .rdp-nav {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.rdp-multiple_months .rdp-caption_end .rdp-nav {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}

.rdp-nav_button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--rdp-cell-size);
  height: var(--rdp-cell-size);
  padding: 0.25em;
  border-radius: 100%;
}

/* ---------- */
/* Dropdowns  */
/* ---------- */

.rdp-dropdown_year,
.rdp-dropdown_month {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.rdp-dropdown {
  appearance: none;
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  cursor: inherit;
  opacity: 0;
  border: none;
  background-color: transparent;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

.rdp-dropdown[disabled] {
  opacity: unset;
  color: unset;
}

.rdp-dropdown:focus-visible:not([disabled]) + .rdp-caption_label {
  background-color: var(--rdp-background-color);
  border: var(--rdp-outline);
  border-radius: 6px;
}

.rdp-dropdown_icon {
  margin: 0 0 0 5px;
}

.rdp-head {
  border: 0;
}

.rdp-head_row,
.rdp-row {
  height: 100%;
}

.rdp-head_cell {
  vertical-align: middle;
  font-size: 0.75em;
  font-weight: 700;
  text-align: center;
  height: 100%;
  height: var(--rdp-cell-size);
  padding: 0;
  text-transform: uppercase;
}

.rdp-tbody {
  border: 0;

}

.rdp-tfoot {
  margin: 0.5em;
}

.rdp-cell {
  width: var(--rdp-cell-size);
  height: 100%;
  height: var(--rdp-cell-size);
  padding: 0;
  text-align: center;
}

.rdp-weeknumber {
  font-size: 0.75em;
}

.rdp-weeknumber,
.rdp-day {
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: var(--rdp-cell-size);
  max-width: var(--rdp-cell-size);
  height: var(--rdp-cell-size);
  margin: 0;
  border: 2px solid transparent;
  border-radius: 100%;

}

.rdp-day_today:not(.rdp-day_outside) {
  font-weight: bold;
}

.rdp-day_selected,
.rdp-day_selected:focus-visible,
.rdp-day_selected:hover {
  color: var(--rdp-selected-color);
  opacity: 1;
  background-color: var(--rdp-accent-color);
}

.rdp-day_outside {
  opacity: 0.5;
}

.rdp-day_selected:focus-visible {
  /* Since the background is the same use again the outline */
  outline: var(--rdp-outline);
  outline-offset: 2px;
  z-index: 1;
}

.rdp:not([dir='rtl']) .rdp-day_range_start:not(.rdp-day_range_end) {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  background-color: var(--color-brand-800);
}

.rdp:not([dir='rtl']) .rdp-day_range_end:not(.rdp-day_range_start) {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px ;
  background-color: var(--color-brand-800);

}

.rdp[dir='rtl'] .rdp-day_range_start:not(.rdp-day_range_end) {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;


}

.rdp[dir='rtl'] .rdp-day_range_end:not(.rdp-day_range_start) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

}

.rdp-day_range_end.rdp-day_range_start {
  border-radius: var(--border-radius-lg);

}

.rdp-day_range_middle {
  border-radius: 0px;

}


/*
FOR DARK MODE

--color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
*/
`;

export default GlobalStyles;
