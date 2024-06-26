/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)", "sans-serif"],
        "open-sans": ["var(--font-open-sans)", "sans-serif"],
        kaushan: ["var(--font-kaushan)", "cursive"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        "nunito-sans": ["var(--font-nunito-sans)", "sans-serif"],
      },
      colors: {
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-light": "var(--color-primary-light)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        "foreground-light": "var(--color-foregrond-light)",
        male: "var(--color-male)",
        female: "var(--color-female)",
        danger: "var(--color-danger)",
        "danger-hover": "var(--color-danger-hover)",
        "success-hover": "var(--color-success-hover)",
        "warning-hover": "var(--color-warning-hover)",
        "info-hover": "var(--color-info-hover)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        info: "var(--color-info)",
        secondary: "var(--color-secondary)",
        "secondary-hover": "var(--color-secondary-hover)",
        muted: "var(--color-muted)",
        "muted-hover": "var(--color-muted-hover)",
        "text-foreground": "var(--color-text-foreground)",
        "text-background": "var(--color-text-background)",
        "text-muted": "var(--color-text-muted)",
        "text-muted-2": "var(--color-text-muted-2)",
        border: "var(--color-border)",
        admin: "var(--color-admin)",
        mod: "var(--color-mod)",
        premium: "var(--color-premium)",
        user: "var(--color-user)",
      },
    },
  },
  plugins: [],
};
