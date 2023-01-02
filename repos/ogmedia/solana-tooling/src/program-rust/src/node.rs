// The main node program. 
// Has links to parents accounts if not an input
// If its an input there will be no link / account bias

// enum for the type of node
#[derive(Debug)]
enum NodeType {
    Input,
    Hidden,
    Output
}

// basic perceptron node struct
#[derive(Debug)]
pub struct Node {
    parent_links: Vec<String>,
    node_type: NodeType,
    num_parents: u8,
    num_children: u8
}

pub fn create(parents: Vec<String>) -> Node {
    Node {
        parent_links: parents,
        node_type: NodeType::Input
        received_all: false
    }
}

impl Node {
    // runs the nodes activation routine
    // pub fn run_activation (&self) -> f64 {
    //     0.0
    // }

    // pub fn process_input() -> {
    // }

    // pub fn send_to_children() -> {
    // }


    // get the parent link accounts
    pub fn get_parent_links (&self) -> Vec<String> {
        let out = &self.parent_links;
        out.to_vec()
    }

    // parent link balance times input value
    pub fn input_with_weight (&self, input: f64, weight: f64) -> f64 {
        input * weight
    }

    // totals all of the products
    pub fn reduce_link_values (&self, product: Vec<f64>) -> f64 {
        // start with bias val
        let mut total: f64 = 0.0;
        for v in product {
            total += v;
        }
        total
    }

    // calculates the sigmoid / filter for the node
    pub fn sig_data (&self, total: f64) -> f64 {
        let partial = f64::powf(std::f64::consts::E, total * -1.0);
        let bottom = 1.0 + partial;
        1.0 / bottom
    }

}