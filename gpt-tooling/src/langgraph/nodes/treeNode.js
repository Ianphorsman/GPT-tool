
class TreeNode {
  constructor({ messages, reflection, parent }) {
    this.messages = messages
    this.reflection = reflection
    this.parent = parent
    this.children = []
    this.value = 0
    this.visits = 0
    this.depth = this.parent ? parent.depth + 1 : 1
    this.isSolved = reflection.foundSolution && this.reflection
    if (this.isSolved) {
      this.markTreeAsSolved()
    }
    this.backpropagate(reflection.normalizedScore)
  }
}

export default TreeNode