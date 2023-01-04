<template>
  <div>
    <document-title />
    <fieldset id="namespaceChoiceBox">
      <form method="get">
        <div>
          <label>이름공간 :</label> 
          <select name="namespace">
            <option value="문서">문서 (4)</option>
            <option value="틀">틀 (1)</option>
          </select> 
          <select name="flag">
            <option value="0">(전체)</option>
            <option value="1">link</option>
            <option value="2">file</option>
            <option value="4">include</option>
            <option value="8">redirect</option>
          </select>
        </div>
        <div class="submitBtn"><button class="" type="submit">제출</button></div>
      </form>
    </fieldset>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent
  } from 'vue'
  export default defineComponent({
    setup() {
      return {}
    }
  })
</script>

<style lang="scss" scoped>
#namespaceChoiceBox {

  border: 1px solid #ccc;
  margin: 0;
  min-width: 0;
  padding: 0.5rem 1rem 1rem;
  display: block;
  margin-inline-start: 2px;
  margin-inline-end: 2px;
  padding-block-start: 0.35em;
  padding-inline-start: 0.75em;
  padding-inline-end: 0.75em;
  padding-block-end: 0.625em;
  min-inline-size: min-content;
  

  > * {
        box-sizing: inherit;
  }
  > form {
    margin-top: 0em;
    color: #373a3c;
    word-break: break-all;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    > div {
      font-size: .9rem;
      color: #373a3c;
      line-height: 1.5;
    }

    > .submitBtn {
      float: right;
      margin: 0;

      > button {
        background-color: #0275d8;
        border-color: #0275d8;
        color: #fff;
        border: 0.0625rem solid #ccc;
        font-size: .9rem;
        font-weight: 400;
        line-height: 1.5;
        margin: 0;
        padding: 0.2rem 0.7rem;
        text-align: center;
        touch-action: manipulation;
      }
    }
  }
}
</style>