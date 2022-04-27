import Cart from "./cart";

describe("Cart", () => {
    let cart;
    const firstProduct = {
        title: "Adidas running shoes - men",
        price: 35388,
    };

    const secondProduct = {
        title: "Nike running shoes - men",
        price: 41872,
    };

    beforeEach(() => {
        cart = new Cart();
    });

    describe("getTotal()", () => {
        it("should return 0 when getTotal() is  executed in a newly created instance", () => {
            expect(cart.getTotal().getAmount()).toBe(0);
        });

        it("should multiply quantity over price and receive the total amount", () => {
            const item = {
                product: firstProduct,
                quantity: 2,
            };

            cart.addItem(item);

            expect(cart.getTotal().getAmount()).toEqual(70776);
        });

        it("should ensure no more than one product exists at the same time", () => {
            cart.addItem({
                product: firstProduct,
                quantity: 2,
            });

            cart.addItem({
                product: firstProduct,
                quantity: 1,
            });

            expect(cart.getTotal().getAmount()).toEqual(35388);
        });

        it("should update total when a product is removed", () => {
            cart.addItem({
                product: firstProduct,
                quantity: 2,
            });

            cart.addItem({
                product: secondProduct,
                quantity: 1,
            });

            expect(cart.getTotal().getAmount()).toEqual(112648);

            cart.removeItem(firstProduct);

            expect(cart.getTotal().getAmount()).toEqual(41872);
        });
    });

    describe("checkout", () => {
        it("should return an object with the total and list of items on the cart", () => {
            cart.addItem({
                product: firstProduct,
                quantity: 2,
            });

            cart.addItem({
                product: secondProduct,
                quantity: 1,
            });

            const checkout = cart.checkout();

            expect(cart.checkout()).toMatchSnapshot();
        });
        it("should return an object with the total and list of items on the cart when summary() is called", () => {
            cart.addItem({
                product: firstProduct,
                quantity: 2,
            });

            cart.addItem({
                product: secondProduct,
                quantity: 1,
            });

            expect(cart.summary()).toMatchSnapshot();
            expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
        });
        
        it('should reset the cart when checkout() is called', () => {
            cart.addItem({
                product: firstProduct,
                quantity: 2,
            });

            cart.addItem({
                product: secondProduct,
                quantity: 1,
            });

            cart.checkout();

            expect(cart.items).toEqual([]);
            expect(cart.getTotal().getAmount()).toEqual(0);
        })
        
        it('should include formatted currency in the summary', () => {
            cart.addItem({
                product: firstProduct,
                quantity: 5,
            });

            cart.addItem({
                product: secondProduct,
                quantity: 3,
            });
            
            expect(cart.summary().formatted).toEqual('R$3,025.56');
        });
    });
    
    describe('Special conditions', () => {
        it('should should apply percentage discount when certain quantity threshould', () => {
            const condition = {
                percentage: 30,
                minimun: 2
            }
            
            cart.addItem({
                product: firstProduct,
                quantity: 3,
                condition
            });
            
            expect(cart.getTotal().getAmount()).toEqual(74315);
        });
        
        it('should should apply discount over quantity when there are even quantities', () => {
            const condition = {
                quantity: 2,
            }
            
            cart.addItem({
                product: firstProduct,
                quantity: 4,
                condition
            });
            
            expect(cart.getTotal().getAmount()).toEqual(70776);
            
        })
        it('should should apply discount over quantity when there are odd quantities', () => {
            const condition = {
                quantity: 2,
            }
            
            cart.addItem({
                product: firstProduct,
                quantity: 5,
                condition
            });
            
            expect(cart.getTotal().getAmount()).toEqual(106164);
        })
        
        it('should receive two or more conditions and determine which one is higher and apply. First case', () => {
            const firstCondition = {
                percentage: 30,
                minimun: 2
            }
            
            
            const secondCondition = {
                quantity: 2,
            }
            
            cart.addItem({
                product: firstProduct,
                condition: [firstCondition, secondCondition],
                quantity: 5,
            });
            
            expect(cart.getTotal().getAmount()).toEqual(106164);
        });
        
        it('should receive two or more conditions and determine which one is higher and apply. First case', () => {
            const firstCondition = {
                percentage: 80,
                minimun: 4
            }
            
            
            const secondCondition = {
                quantity: 2,
            }
            
            cart.addItem({
                product: firstProduct, // 35388 * 5 = 120960
                condition: [firstCondition, secondCondition],
                quantity: 5,
            });
            
            expect(cart.getTotal().getAmount()).toEqual(35388);
        });
    })
});
