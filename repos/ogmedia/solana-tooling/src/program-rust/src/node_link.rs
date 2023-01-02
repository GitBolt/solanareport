pub struct NodeLink {
    balance_weight: f64
}

impl NodeLink {
    fn create() -> NodeLink {
        NodeLink {
            balance_weight: 0.0
        }
    }

    fn weight(self) -> f64 {
        self.balance_weight
    }

    fn change_weight(&mut self, weight: f64) {
        self.balance_weight = weight;
    }
}