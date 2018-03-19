/**
 * @interface
 */
class GATaskManagerPublicInterface {
  /**
   * @param {string} gaTaskName
   * @param {string} userTaskName
   * @param {function(!Model)} taskFunction
   */
  addFunctionToTask(gaTaskName, userTaskName, taskFunction) {}
  /**
   * @param {string} gaTaskName
   * @param {string} userTaskName
   */
  removeFunctionFromTask(gaTaskName, userTaskName) {}
  /**
   * @param {string} index
   * @param {string|number|function(): string|number} value
   * @param {string} gaTaskName
   */
  setCustomDimension(index, value, gaTaskName) {}
  /**
   * @param {string} index
   * @param {string} gaTaskName
   */
  unsetCustomDimension(index, gaTaskName) {}
  remove() {}
}
