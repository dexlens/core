function maskUsername(username: string) {
    // If username is too short, return as is
    if (username.length <= 4) {
        return username;
    }

    // Keep first 2 and last 2 characters, replace middle with dots
    const firstTwo = username.slice(0, 2);
    const lastTwo = username.slice(-2);
    const middleDots = '.'.repeat(username.length - 4);

    return `${firstTwo}${middleDots}${lastTwo}`;
}

export { maskUsername };