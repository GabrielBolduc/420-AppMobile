// models/Recipe.js
export default class Recipe {
  constructor({ id = null, category = 1, name = '', durationHours = 0, durationMinutes = 0, description = '', user_id = null } = {}) {
    this.id = id;
    this.category = category;
    this.name = name;
    this.durationHours = durationHours;
    this.durationMinutes = durationMinutes;
    this.description = description;
    this.user_id = user_id;
  }

  formattedDuration() {
    const mm = String(this.durationMinutes).padStart(2, '0');
    return `${this.durationHours}h${mm}`;
  }
}
