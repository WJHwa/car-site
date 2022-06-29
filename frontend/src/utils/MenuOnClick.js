export default async function MenuOnClick(v, list) {
  let lists = [...list];
  let data = [...list];
  let result = [];
  var temp;
  switch (v) {
    case "국산":
      for (let i = 0; i < lists.length; i++) {
        if (lists[i].origin === v) {
          result.push(lists[i]);
        }
      }
      return [...result];
    case "수입":
      for (let i = 0; i < lists.length; i++) {
        if (lists[i].origin === v) {
          result.push(lists[i]);
        }
      }
      return [...result];
    case "화물":
      for (let i = 0; i < lists.length; i++) {
        if (lists[i].origin === v) {
          result.push(lists[i]);
        }
      }
      return [...result];
    case "경차":
      for (let i = 0; i < lists.length; i++) {
        if (lists[i].size === v) {
          result.push(lists[i]);
        }
      }
      return [...result];
    case "소형":
      for (let i = 0; i < lists.length; i++) {
        if (lists[i].size === v) {
          result.push(lists[i]);
        }
      }
      return [...result];
    case "준중형":
      for (let i = 0; i < lists.length; i++) {
        if (lists[i].size === v) {
          result.push(lists[i]);
        }
      }
      return [...result];
    case "중형":
      for (let i = 0; i < lists.length; i++) {
        if (lists[i].size === v) {
          result.push(lists[i]);
        }
      }
      return [...result];
    case "대형":
      for (let i = 0; i < lists.length; i++) {
        if (lists[i].size === v) {
          result.push(lists[i]);
        }
      }
      return [...result];
    case "SUV":
      for (let i = 0; i < lists.length; i++) {
        if (lists[i].size === v) {
          result.push(lists[i]);
        }
      }
      return [...result];
    case "스포츠카":
      for (let i = 0; i < lists.length; i++) {
        if (lists[i].size === v) {
          result.push(lists[i]);
        }
      }
      return [...result];
    case "최근등록순":
      for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < data.length - 1 - i; j++) {
          if (data[j].date < data[j + 1].date) {
            temp = data[j];
            data[j] = data[j + 1];
            data[j + 1] = temp;
          }
        }
      }
      return [...data];
    case "가격높은순":
      for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < data.length - 1 - i; j++) {
          if (Number(data[j].price) < Number(data[j + 1].price)) {
            temp = data[j];
            data[j] = data[j + 1];
            data[j + 1] = temp;
          }
        }
      }
      return [...data];
    case "가격낮은순":
      for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < data.length - 1 - i; j++) {
          if (Number(data[j].price) > Number(data[j + 1].price)) {
            temp = data[j];
            data[j] = data[j + 1];
            data[j + 1] = temp;
          }
        }
      }
      return [...data];
    case "키로수높은순":
      for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < data.length - 1 - i; j++) {
          if (Number(data[j].km) < Number(data[j + 1].km)) {
            temp = data[j];
            data[j] = data[j + 1];
            data[j + 1] = temp;
          }
        }
      }
      return [...data];
    case "키로수낮은순":
      for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < data.length - 1 - i; j++) {
          if (Number(data[j].km) > Number(data[j + 1].km)) {
            temp = data[j];
            data[j] = data[j + 1];
            data[j + 1] = temp;
          }
        }
      }
      return [...data];
    case "연식높은순":
      for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < data.length - 1 - i; j++) {
          if (Number(data[j].year) < Number(data[j + 1].year)) {
            temp = data[j];
            data[j] = data[j + 1];
            data[j + 1] = temp;
          }
        }
      }
      return [...data];
    case "연식낮은순":
      for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < data.length - 1 - i; j++) {
          if (Number(data[j].year) > Number(data[j + 1].year)) {
            temp = data[j];
            data[j] = data[j + 1];
            data[j + 1] = temp;
          }
        }
      }
      return [...data];
  }
}
