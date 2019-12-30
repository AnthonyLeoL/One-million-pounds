class Workout {
  constructor(exercises = [], workoutTotal = 0, date = new Date()) {
    this.exercises = exercises;
    this.workoutTotal = workoutTotal;
    this.date = date;
    return this;
  }
}

class Set {
  constructor(id = 0, reps = 0, weight = 0, setTotal = 0) {
    this.reps = reps;
    this.weight = weight;
    this.id = id;
    this.setTotal = setTotal;
    return this;
  }
}

class Exercise {
  constructor(sets = [], exerciseTotal = 0, name = "", nextID = 0) {
    this.sets = sets;
    this.exerciseTotal = exerciseTotal;
    this.name = name;
    this.nextID = nextID;
    return this;
  }
}

export { Workout, Set, Exercise };
