(() => {
    let o;
    return {
        ["\u0000\u0000\r\n" +
            "A"]: "B\r" +
            "C\n" +
            "\n",
    };
})();
