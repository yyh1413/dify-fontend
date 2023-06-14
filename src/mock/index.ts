import { MockMethod } from "vite-plugin-mock";

const mock: Array<MockMethod> = [
  {
    url: "/api/test",
    method: "get",
    response: () => {
      return {
        code: 200,
        msg: "ok",
        "data|5": [
          {
            "id|+1": 0,
            username: "@cname",
            date: "@date(yyyy-MM-dd)",
            // description:'@paragraph',
            email: "@email()",
            "age|18-50": 18,
          },
        ],
      };
    },
  },
  {
    url: "/api/test1",
    method: "get",
    response: () => {
      return {
        code: 200,
        msg: "ok",
        data: {
          curr: 1,
          count: 1,
          size: 1,
          "data|20": [
            {
              "id|+1": 0,
              username: "@cname",
              date: "@date(yyyy-MM-dd)",
              // description:'@paragraph',
              email: "@email()",
              "age|18-50": 18,
            },
          ],
        },
      };
    },
  },
  {
    url: "/api/getSprintDta",
    method: "get",
    response: () => {
      return {
        code: 200,
        msg: "ok",
        data: {
          curr: 1,
          count: 1,
          size: 1,
          "data|5": [
            {
              "sprintName|+1": 0,
              quarter: "@cname",
              date: "@date(yyyy-MM-dd)",
              // description:'@paragraph',
              email: "@email()",
              "age|18-50": 18,
            },
          ],
        },
      };
    },
  },
];
export default mock;
