import { renderString } from "nunjucks";
import { foo } from "./test";

import "./styles/example.css";

// tslint:disable-next-line:no-console
console.log(renderString("Hello {{ name }}. It is {{ date }}. Foo: {{ bar }}", {
	date: new Date(),
	name: "erdii",
	bar: foo(),
}));
