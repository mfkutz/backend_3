export class TestingPerformance {
  static async simplex(req, res) {
    let total = 1;
    for (let i = 0; i < 100; i++) {
      total = i * i;
    }
    return res.send({ total });
  }

  static async complex(req, res) {
    let total = 1;
    for (let i = 1; i < 1000000000; i++) {
      total = i * i;
    }
    return res.send({ total });
  }
}
