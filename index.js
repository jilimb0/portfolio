// let firstRow = prompt("Первая строка:")
// let secondRow = prompt("Вторая строка:")
// let letter = prompt("Буква для сравнения:")

// const getRow = () => {
//   let firstRes = countedChar(firstRow, letter)
//   let secondRes = countedChar(secondRow, letter)

//   if (firstRes === secondRes) {
//     alert(`Здесь одинаковое количество букв: ${letter}`)
//   }

//   firstRes > secondRes ? alert(firstRow) : alert(secondRow)
// }

// const countedChar = (row, char) => {
//   let counted = 0

//   for (let i = 0; i < row.length; i++) {
//     if (row.charAt(i) === char) {
//       counted++
//     }
//   }

//   return counted
// }

// getRow()

// function formattedPhone(phone) {
//   phoneObj = phone.split("")
//   phoneLenght = Object.keys(phoneObj).length

//   phoneLenght === 12 && phone[0] === "+"
//     ? console.log(
//         phoneObj.splice(0, 2).join("") +
//           " (" +
//           phoneObj.splice(0, 3).join("") +
//           ") " +
//           phoneObj.splice(0, 3).join("") +
//           "-" +
//           phoneObj.splice(0, 2).join("") +
//           "-" +
//           phoneObj.splice(0, 2).join("")
//       )
//     : phoneLenght === 11 && phone[0] === "8"
//     ? console.log(
//         phoneObj.splice(0, 1).join("") +
//           " (" +
//           phoneObj.splice(0, 3).join("") +
//           ") " +
//           phoneObj.splice(0, 3).join("") +
//           "-" +
//           phoneObj.splice(0, 2).join("") +
//           "-" +
//           phoneObj.splice(0, 2).join("")
//       )
//     : phoneLenght === 10
//     ? console.log(
//         "(" +
//           phoneObj.splice(0, 3).join("") +
//           ") " +
//           phoneObj.splice(0, 3).join("") +
//           "-" +
//           phoneObj.splice(0, 2).join("") +
//           "-" +
//           phoneObj.splice(0, 2).join("")
//       )
//     : console.log("Check entered number")
// }

// formattedPhone("+71234567890") // +7 (123) 456-78-90
