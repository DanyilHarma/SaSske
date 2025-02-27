import "../src/app/globals.css";
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "../src/shared/ui/theme-provider";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        (Story) => (
            <ThemeProvider>
                <Story />
            </ThemeProvider>
        ),
    ],
};

export default preview;
