<template>
  <div>
    <h2>Quiz</h2>
    <div
      v-for="(questions, questionIndex) in quiz"
      :key="questions.question"
      class="pb-8 mb-8 relative"
    >
      <p class="lead">
        {{ questions.question }}
      </p>
      <BaseRadioButton
        v-for="(answers, index) in questions.answers"
        :id="answers.answer"
        :key="index"
        v-model="userAnswers[questionIndex]"
        :label="answers.answer"
        :field-value="index"
        :field-name="'question' + questionIndex"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    quiz: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      correctAnswers: false,
      userAnswers: [],
    }
  },
  watch: {
    userAnswers(answers) {
      for (let i = 0; i < answers.length; i++) {
        this.correctAnswers = this.checkAnswer(answers[i], i)
      }
      this.$emit('answer-questions', this.correctAnswers)
    },
  },
  methods: {
    checkAnswer(answer, index) {
      const question = this.quiz[index]
      const answers = question.answers
      const correctAnswer = answers.findIndex(
        (answer) => answer.is_correct === true
      )
      return parseInt(answer) === parseInt(correctAnswer)
    },
  },
}
</script>

<style lang="scss" scoped></style>

<!-- <StepsQuiz
      v-if="hasQuiz"
      :quiz="stepQuiz"
      @answer-questions="onQuizAnswered"
    /> 
    <div class="flex flex-row items-center justify-between mb-8">
      <StepsPrev btn-class="btn-dark" />
      <StepsNext btn-class="btn-dark" :disabled="quizDisabled" />
    </div>-->
