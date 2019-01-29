const Mock = require("mockjs");
Mock.setup({
  timeout: "200 - 400",
});
const Random = Mock.Random;
const shopsData = () => {
  let shopList = [];
  for (let i = 0; i < 15; i++) {
    let newShop = {
      title: Random.ctitle(5, 8),
      image: Random.dataImage("250x250", "mock的图片"),
      type: Random.cword(4, 5),
      distance: Random.integer(0, 15000),
      discount: Random.natural(0, 2),
      id: Random.word(5) + Random.string("0123456789", 8),
    };
    shopList.push(newShop);
  }
  return {
    code: 200,
    msg: "",
    data: { shopList },
  };
};

Mock.mock(/.*(\/api\/shopLists).*/, "get", shopsData);
let randList = (num, s = "") => {
  const list = new Array(num).fill(0).map((item, index) => {
    return {
      name: Random.cword(5),
      value: s + index + Random.word(8),
    };
  });
  return list;
};
const selectData = () => {
  const areaList = randList(16, "d");
  const sortList = randList(3, "s");
  const filterList = randList(10, "f");
  const classList = new Array(9).fill(0).map((item, index) => {
    if (index === 0) {
      return {
        name: Random.cword(5),
        value: "c" + index + Random.word(8),

      };
    } else {
      return {
        name: Random.cword(5),
        value: "c" + index + Random.word(8),
        children: new Array(Random.integer(7, 16)).fill(0).map((item, index) => {
          return {
            name: Random.cword(5),
            value: "ch" + index + Random.word(7),
          };
        }),
      };
    }
  });
  return {
    code: 200,
    msg: "",
    data: { classList, areaList, sortList, filterList },
  };
};
Mock.mock(/.*(\/api\/selectData).*/, "get", selectData);

const otherSelectData = () => {
  const classList = randList(Random.integer(7, 16), "o");
  const areaList = randList(16, "d");
  const sortList = randList(3, "s");
  const filterList = randList(10, "f");
  return {
    code: 200,
    msg: "",
    data: { classList, areaList, sortList, filterList },
  };
};
Mock.mock(/.*(\/api\/otherSelectData).*/, "get", otherSelectData);

const shopDetails = () => {
  const images = new Array(Random.integer(1, 4)).fill(0).map(() => {
    return Random.dataImage("750x300", "mock的图片");
  });
  const shopName = Random.ctitle(2, 4);
  const shopType = Random.csentence(1, 3);
  const introText = [Random.cparagraph(1, 4), ""][Random.integer(0, 1)];
  const address = Random.csentence(4, 7);
  const tel = new Array(Random.integer(0, 2)).fill(0).map(() => {
    return Random.string("0123456789", 11);
  });
  const disList = new Array(Random.integer(0, 2)).fill(0).map(() => {
    return {
      type: Random.integer(1, 2),
      stateType: ["商家优惠", "银行优惠"][Random.integer(0, 1)],
      info: Random.cword(5, 8),
      start: Random.date(),
      end: Random.date(),
      day: ["每天8点到20点", ""][Random.integer(0, 1)],
      count: ["每天" + Random.integer(2, 5) + "次", ""][Random.integer(0, 1)],
      maxAmt: ["最高优惠" + Random.integer(20, 50) + "元", ""][Random.integer(0, 1)],
      limt: ["名额有限，先到先得", ""][Random.integer(0, 1)],
    };
  });
  return {
    code: 200,
    msg: "",
    data: { images, shopName, shopType, introText, address, tel, disList },
  };
};
Mock.mock(/.*(\/api\/shopDetails).*/, "get", shopDetails);

const qutoPay = () => {
  const total = Random.float(60, 200, 0, 2);
  const shopName = Random.ctitle(2, 4);
  const disList = new Array(Random.integer(0, 2)).fill(0).map(() => {
    return {
      type: Random.integer(1, 2),
      stateType: ["商家优惠", "银行优惠"][Random.integer(0, 1)],
      info: Random.cword(5, 8),
      amt: Random.float(0, Math.floor(total / 2 - 10), 0, 2),
    };
  });
  return {
    code: 200,
    msg: "",
    data: { total, disList, shopName },
  };
};
Mock.mock(/.*(\/api\/qutoPay).*/, "get", qutoPay);

const orderDetails = () => {
  const image = Random.dataImage("250x250", "mock的图片");
  const total = Random.float(30, 200, 0, 2);
  const shopName = Random.ctitle(2, 4);
  const businessPreferences = Random.float(0, 20, 0, 2);
  const bankPreferences = Random.float(0, 20, 0, 2);
  const amt = (total * 100 - businessPreferences * 100 - bankPreferences * 100) / 100;
  const time = Random.now();
  const orderTime = time.slice(0, 16);
  const a = time.split(" ");
  const orderNo = a[0].split("-").join("") + a[1].split(":").join("") + Random.string("0123456789", 8);
  return {
    code: 200,
    msg: "",
    data: { image, total, businessPreferences, shopName, bankPreferences, amt, orderTime, orderNo },
  };

};
Mock.mock(/.*(\/api\/orderDetails).*/, "get", orderDetails);

const calcDis = () => {
  const bisamt = Random.float(1, 5, 0, 2);
  const bakamt = Random.float(1, 5, 0, 2);
  return {
    code: 200,
    msg: "",
    data: { bisamt, bakamt },
  };
};
Mock.mock(/.*(\/api\/calcDis).*/, "post", calcDis);