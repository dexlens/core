export default async (plugins: string[]) => {
    for (const scriptPath of plugins) {
        import(`./plugins/${scriptPath}`).then(
            plugin => plugin.default()
        ).catch(
            e => console.log(`Some error has been occured in process of plugin \u001b[38;5;50m${scriptPath}\x1b[31;1m load\n${e}\n`)
        )
    }
}