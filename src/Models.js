class WORKOUT {
  constructor(exercises = [], totalLifted = 0, date = new Date()) {
    this.exercises = exercises;
    this.totalLifted = totalLifted;
    this.date = date;
    return this;
  }
}

export { WORKOUT };
