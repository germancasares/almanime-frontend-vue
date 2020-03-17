<template>
  <main>
    <section class="section" v-if="!isLoading">
      <div class="columns" v-for="(phrase, index) in subtitle.events.dialogue" :key="`phrase-${index}`">
        <div class="column">
          <div class="box">
            <span>{{ phrase.Text.raw }}</span>
          </div>
        </div>
        <div class="column is-narrow">
          <div style="width: 30px"></div>
        </div>
        <div class="column">
          <b-field>
            <b-input v-model="partialEditable.events.dialogue[index].Text.raw"></b-input>
          </b-field>
        </div>
      </div>
      <div class="save">
        <button class="button is-primary is-large" @click="save">Save</button>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
// //@ts-ignore
// import AssSerialize from 'ass-serialize';
// //@ts-ignore
// import ASS from 'assjs';
// const ass = new ASS(AssSerialize.serialize(this.subtitle), this.$refs["video"]);
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import {
  parse,
  ParsedASS,
  ParsedASSEventObject,
  ParsedASSEventTextParsed,
  ScriptInfo,
  ParsedASSStyles,
  ParsedASSEventTextParsedTag,
} from 'ass-compiler';
import SubtitleEditorModule from '@/app/fansub/subtitleEditor/store';
//@ts-ignore
import AssSerialize from 'ass-serialize';

@Component({
  computed: {
    ...mapState('SubtitleEditor', ['subtitle']),
  },
})
export default class SubtitleEditor extends Vue {
  private subtitle!: ParsedASS;
  private isLoading = true;
  private partialEditable = {} as ParsedASS;

  private async created() {
    await SubtitleEditorModule.LoadSubtitle();

    this.initPartial(this.subtitle);
    this.isLoading = false;
  }

  private initPartial(original: ParsedASS) {
    this.partialEditable = {
      info: JSON.parse(JSON.stringify(original.info)) as ScriptInfo,
      styles: JSON.parse(JSON.stringify(original.styles)) as ParsedASSStyles,
      events: {
        format: original.events.format.slice(),
        comment: JSON.parse(
          JSON.stringify(original.events.comment),
        ) as ParsedASSEventObject[],
        dialogue: [] as ParsedASSEventObject[],
      },
    } as ParsedASS;

    for (const dialogue of original.events.dialogue) {
      const d = JSON.parse(JSON.stringify(dialogue)) as ParsedASSEventObject;

      d.Text.combined = '';
      d.Text.raw = '';
      d.Text.parsed = [] as ParsedASSEventTextParsed[];

      this.partialEditable.events.dialogue.push(d);
    }
  }

  private save() {
    // Raw --> Combined and Parsed
    for (const dialogue of this.partialEditable.events.dialogue) {
      const raw = dialogue.Text.raw;

      dialogue.Text.combined = raw;
      dialogue.Text.parsed = [
        {
          tags: [] as ParsedASSEventTextParsedTag[],
          drawing: [] as string[][],
          text: raw,
        }
      ] as ParsedASSEventTextParsed[];
    }
    





  }
}
</script>

<style lang='scss' scoped>
.columns:not(:last-child) {
  margin-bottom: 0px;
}

.box {
  background-color: $light;
  padding: 0.5rem;
  height: 100%;
}

.save {
  display: flex;
  justify-content: flex-end;
}

>>> .field {
  height: 100%;

  .control {
    height: 100%;

    .input {
      height: 100%;
    }
  }
}
</style>
