import "@testing-library/jest-dom/vitest";
import * as matchers from "vitest-axe/matchers";
import { expect } from "vitest";
expect.extend(matchers);

declare module "vitest" {
	export interface Assertion extends matchers.AxeMatchers {}
	export interface AsymmetricMatchersContaining extends matchers.AxeMatchers {}
}