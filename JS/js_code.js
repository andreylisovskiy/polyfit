function fit_data(x, y, poly_order) {
    let coefs = polyfit(x, y, poly_order);

    const polynomial_expression = get_poly_expr(coefs);
    // console.log(polynomial_expression);

    const poly_x = get_x_points(x);      // gets optimal poly x points for presentation
    // console.log(poly_x);

    const poly_y = eval_expression(polynomial_expression, poly_x);
    // console.log(poly_y);

    return [poly_x, poly_y, polynomial_expression, coefs]
}

function prep_for_chart_js(x_data, y_data) {
    let data_array = [];
    for (let index in x_data) {
        data_array.push({'x': x_data[index], 'y': y_data[index]});
    }
    return data_array;
}

function eval_expression (polynomial_expression, poly_x) {
    const node = math.parse(polynomial_expression);   // returns the root Node of an expression tree
    // const evaluate = node.evaluate({x: 3});
    let y_array = [];
    for (let x_ of poly_x) {
        y_array.push(node.evaluate({x: x_}));
    }
    return y_array;
}


function get_x_points(x_data) {
    const min_x = math.min(x_data);
    const max_x = math.max(x_data);
    const num_of_points = x_data.length * 100;
    const step = math.round((max_x - min_x)/num_of_points,2);
    const x_array = range(min_x, max_x, step);
    return x_array
}

// function* range(start, stop, step) {
//     if (stop == null) {
//         // one param defined
//         stop = start;
//         start = 0;
//     }
//
//     for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
//         yield i;
//     }
// }

function range(start, stop, step) {
    if (stop == null) {
        // one param defined
        stop = start;
        start = 0;
    }

    let return_list = [];
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
        return_list.push(math.round(i,2));
    }
    return return_list;
}

function polyfit(x_data, y_data, poly_order) {
    let max_order = 40;
    let min_order = 0;

    if (poly_order <= max_order && poly_order >= min_order) {
        // follow this Vandermonde matrix equation: X*a=y as could be found in https://mathworld.wolfram.com/LeastSquaresFittingPolynomial.html

        // X matrix:
        let X_array = [];
        for (let index in x_data) {
            let x_point = x_data[index];
            let inner_array = [];
            for (let i = 0; i <= poly_order; i++) {
                inner_array.push(math.pow(x_point, i));
            }
            X_array.push(inner_array);
        }
        const X_matrix = math.matrix(X_array) // Matrix

        // y matrix:
        const y_matrix = math.matrix(y_data) // Matrix

        // a matrix:
        // // - aka the polynomial coefficients:
        // const a_array = [];
        // for (let i = 0; i < poly_order; i++) {
        //     a_array.push(math.pow(x_point, i));
        // }
        const X_transpose = math.transpose(X_matrix);
        const a = math.pow(math.multiply(X_transpose,X_matrix),-1);
        const b = math.multiply(X_transpose, y_matrix);
        const a_matrix = math.multiply(a, b);
        const a_coefficients = a_matrix.toArray();

        // console.log(X_matrix);
        // console.log(y_matrix);
        // console.log(a_matrix);
        console.log(a_coefficients);

        return a_coefficients;
    } else {
        alert('choose polynomial order between '+min_order+' and '+max_order);
    }

}

function get_poly_expr(coefs) {
    let expression_array = [];
    for (let index in coefs) {
        const coef = coefs[index];
        expression_array.push(coef+'x^'+index);
    }
    return expression_array.join('+');
}
