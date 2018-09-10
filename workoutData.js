var workout10k = {
  // week1
  week1 : {
    week:1,
    workout1 : {
      workout:1,
      rep:8,
      jogM:1,
      jogS:0,
      walkM:2,
      walkS:0
    },
    workout2 : {
      workout:2,
      rep:6,
      jogM:1,
      jogS:0,
      walkM:2,
      walkS:0
    },
    workout3 : {
      workout:3,
      rep:10,
      jogM:1,
      jogS:0,
      walkM:2,
      walkS:0
    }
  },
  // week 2
  week2 : {
    week:2,
    workout1 : {
      workout:1,
      rep:7,
      jogM:2,
      jogS:0,
      walkM:2,
      walkS:0
    },
    workout2 : {
      workout:2,
      rep:6,
      jogM:2,
      jogS:0,
      walkM:2,
      walkS:0
    },
    workout3 : {
      workout:3,
      rep:8,
      jogM:2,
      jogS:0,
      walkM:2,
      walkS:0
    }
  }
}
console.log(workout10k.week1.workout1.jogM);
console.log(Object.keys(workout10k.week1).length);
console.log(Object.keys(workout10k));
console.log(workout10k['week1']['workout1']);
