import { describe, test, it, expect, vi } from "vitest";

describe("get/merchandise", () => {
  it("should return merchandise page", () => {
    /*variables*/
    const response = {
      render: vi.fn(),
    };
    /*method*/
    ((request, response) => {
      response.render("merchandise", { title: "Merchandise" });
    })({}, response);
    /*result expected*/
    expect(response.render).toHaveBeenCalledWith("merchandise", {
      title: "Merchandise",
    });
  });
});
describe("get/dashboard", () => {
  it("should return dashboard page", () => {
    /*variables*/
    const response = {
      render: vi.fn(),
    };
    /*method*/
    ((request, response) => {
      response.render("dashboard", { title: "Dashboard" });
    })({}, response);
    /*result expected*/
    expect(response.render).toHaveBeenCalledWith("dashboard", {
      title: "Dashboard",
    });
  });
});
describe("get/cart", () => {
  it("should return cart page", () => {
    /*variables*/
    const response = {
      render: vi.fn(),
    };
    /*method*/
    ((request, response) => {
      response.render("cart", { title: "Cart" });
    })({}, response);
    /*result expected*/
    expect(response.render).toHaveBeenCalledWith("cart", {
      title: "Cart",
    });
  });
});
