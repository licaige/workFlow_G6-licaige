<template>
  <div class="pic-uploading">
    <PMessage v-for="msg of messages" :key="msg.id" :severity="msg.severity">
      {{ msg.content }}
    </PMessage>
    <!--
      Можно отправлять пост-запрос напрямую, заменив
      "customUpload" на "url='/api/upload'",
      где '/api/upload' - ендпоинт запроса
    -->
    <PFileUpload
      customUpload
      @uploader="onUpload"
      mode="basic"
      name="image"
      accept="image/*"
      chooseLabel="Выберете изображение"
      uploadLabel="Загрузить"
      cancelLabel="Отмменить"
      :maxFileSize="5.243e7"
      invalidFileSizeMessage="Файл слишком большой. Размер файла не может превышать 50мб"
    />

    <div class="pic-uploading__params">
      <h3 class="pic-uploading__params__title">
        Введите параметры сохраенния изображения:
      </h3>
      <div class="inputs">
        <div class="inputs__block_labled-float">
          <PFloatLabel>
            <PInputText id="width" v-model="picParams.width" />
            <label for="width"> Ширина (в пикселях) </label>
          </PFloatLabel>

          <PFloatLabel>
            <PInputText id="height" v-model="picParams.height" />
            <label for="width"> Высота (в пикселях) </label>
          </PFloatLabel>
        </div>

        <div class="inputs__block_labled">
          <label for="position"> Позиционирование изображения </label>
          <PSelectButton
            v-model="picParams.position"
            :options="picPosition"
            optionLabel="name"
            aria-labelledby="multiple"
            id="position"
          />
        </div>
        <div class="inputs__block_labled-float">
          <PFloatLabel>
            <PInputText id="legend" v-model="picParams.legend" />
            <label for="legend"> Надпись для изображения </label>
          </PFloatLabel>
        </div>
        <div class="inputs__block_labled">
          <label for="isLink"> Является сслыкой </label>
          <PInputSwitch v-model="picParams.isLink" id="isLink" />
        </div>
        <div class="inputs__block_labled-float" v-if="picParams.isLink">
          <PFloatLabel>
            <label for="link"> Адрес ссылки: </label>
            <PInputText v-model="picParams.link" id="link" />
          </PFloatLabel>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FileUpload from "primevue/fileupload";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import SelectButton from "primevue/selectbutton";
import InputSwitch from "primevue/inputswitch";
import Message from "primevue/message";
import axios from "axios";
import { reactive, ref } from "vue";

// В проектах на другой работе активно юзаю
// Прайм и всегда задаю праймовским компонентам
// такие алиасы чтобы их легче было идентифицировать среди остальных
const PFileUpload = FileUpload;
const PInputText = InputText;
const PFloatLabel = FloatLabel;
const PSelectButton = SelectButton;
const PInputSwitch = InputSwitch;
const PMessage = Message;

const picParams = reactive({}); // объект, в который собираются вссе параметры из ТЗ
const picPosition = ref([
  { name: "Слева", value: "left" },
  { name: "По центру", value: "center" },
  { name: "Справа", value: "right" },
]);
const messages = ref([]);

const onUpload = async (event) => {
  try {
    const file = event.files[0]; // Загруженный файл
    const apiPicUrl = "http://localhost:5173"; // Добавить нужный ендпоинт
    const apiPicParamsUrl = "http://localhost:5173"; // Добавить нужный ендпоинт
    const picResponse = await axios.post(apiPicUrl, file);
    const paramsResponse = await axios.post(apiPicParamsUrl, picParams);
    messages.value.push({
      content: "Загрузка успешна",
      severity: "success",
    });
  } catch {
    messages.value.push({
      content: "Произошла ошибка. Попробуйте ешё раз",
      severity: "error",
    });
  }
};
</script>

<style scoped lang="scss">
.pic-uploading {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: fit-content;

  &__danger,
  &__success {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  &__params {
    display: flex;
    flex-direction: column;
    padding-top: 15px;
    width: fit-content;

    &__title {
      font-weight: 400;
      margin: 0;
    }

    .inputs {
      display: flex;
      flex-direction: column;

      padding-top: 30px;
      gap: 15px;

      &__block {
        display: flex;
        gap: 15px;
        padding: 15px;
        border-radius: 5px;
        border: 1px solid #10b981;
        width: 100%;
        align-items: center;
        justify-content: center;

        &_labled {
          @extend .inputs__block;
          flex-direction: column;
        }

        &_labled-float {
          @extend .inputs__block;
          padding-top: 25px;
        }
      }
    }
  }
}
</style>
