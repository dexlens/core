import dedent from "npm:dedent";

function useDedent(template: string) {
    return dedent(template);
}

export { useDedent };