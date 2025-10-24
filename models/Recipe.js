export default class Recipe {
  constructor({ id, category, name, duration_hours, duration_minutes, description, user_id }) {
    this.id = id;
    this.category = category;
    this.name = name;
    this.durationHours = duration_hours;
    this.durationMinutes = duration_minutes;
    this.description = description;
    this.userId = user_id;
  }

  toJSON() {
    return {
      category: this.category,
      name: this.name,
      duration_hours: this.durationHours,
      duration_minutes: this.durationMinutes,
      description: this.description,
      user_id: this.userId
    };
  }
}