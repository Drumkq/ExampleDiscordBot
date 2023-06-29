abstract class BaseError extends Error {
    public name: string;

    protected constructor(name: string, message: string) {
        super(message);

        this.name = name;
    }
}

export {
    BaseError
};