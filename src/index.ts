export type MyFirstNPMPackageType = {
    name: string;
    foo: boolean;
}

export interface ExampleInterface {
    id: number;
    value: string;
}

export class ExampleClass {
    constructor(public data: MyFirstNPMPackageType) {}

    display(): string {
        return `Name: ${this.data.name}, Foo: ${this.data.foo}`;
    }
}
