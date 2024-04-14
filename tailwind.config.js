/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)", "sans-serif"],
        pacifico: ["var(--font-pacifico)", "cursive"],
      },
      colors: {
        primary: "var(--color-primary)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        male: "var(--color-male)",
        female: "var(--color-female)",
        danger: "var(--color-danger)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        info: "var(--color-info)",
        secondary: "var(--color-secondary)",
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
