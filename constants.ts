
export const OG_LEVELS: { [key: number]: { name: string; info?: string }[] } = {
    1: [
      { name: "assessment" }, { name: "syllables" }, { name: "consonant" }, { name: "vowel" }, { name: "closed syllables" }, { name: "a" }, { name: "e" }, { name: "i" }, { name: "o" }, { name: "u" }, 
      { name: "y" }, { name: "z" }, { name: "x" }, { name: "c" }, { name: "v" }, { name: "b" }, { name: "n" }, { name: "m" }, { name: "l" }, { name: "k" }, { name: "j" }, { name: "h" }, { name: "g" }, { name: "f" }, { name: "d" }, { name: "s" }, { name: "q" }, { name: "u" }, { name: "w" }, 
      { name: "r" }, { name: "t" }, { name: "p" }, { name: "ss" }, { name: "ll" }, { name: "zz" }, { name: "ff" }, { name: "ch" }, { name: "sh" }, { name: "th" }, { name: "wh" }, { name: "tch" }, { name: "bl" }, { name: "st" }, { name: "str" }, { name: "sp" }, 
      { name: "spr" }, { name: "fl" }, { name: "cl" }, { name: "i-e" }, { name: "a-e" }, { name: "an" }, { name: "beginning blends" }, { name: "o-e" }, { name: "e-e" }, { name: "u-e" }
    ],
    2: [
      { name: "open syllable" }, { name: "y says i" }, { name: "y says e" }, { name: "y generalization" }, { name: "tch" }, { name: "ch/tch generalization" }, 
      { name: "ang" }, { name: "ing" }, { name: "ung" }, { name: "ink" }, { name: "ank" }, { name: "unk" }, { name: "ar" }, { name: "ir" }, { name: "ur" }, { name: "er" }, { name: "or" }, { name: "-s" }, { name: "ve" }, { name: "-er" }, { name: "war" }, 
      { name: "wor" }, { name: "ct" }, { name: "ic" }, { name: "vc/cv" }, { name: "vc/ccv" }, { name: "vcc/cv" }, { name: "ai" }, { name: "ay" }, { name: "ai/ay generalizations" }, 
      { name: "v-e/c" }, { name: "verb s" }, 
      { 
        name: "se",
        info: "This spelling pattern is a legacy of the Norman Conquest and the work of French scribes. In Old English, words like house (hus) ended in a single s. However, as English spelling became standardized, scribes wanted to distinguish between words that were plural and words that just happened to end in the /s/ sound. They adopted the French habit of adding a silent e to \"protect\" the s from looking like a suffix. This helped readers immediately identify that the word was a single, whole unit rather than a plural noun."
      }, 
      { name: "-ed (t)" }, { name: "-ed (d)" }, { name: "-ed (id)" }, { name: "-y" }, { name: "ee" }, { name: "ea" }, { name: "ey" }, { name: "all" }, { name: "al" }, 
      { name: "ind" }, { name: "ild" }, { name: "old" }, { name: "ost" }, { name: "olt" }, { name: "-ing" }, { name: "oa" }, { name: "oe" }, { name: "ow" }, { name: "oo food" }, { name: "oo book" }, { name: "ou" }, 
      { name: "ou/ow generalization" }, { name: "assessment" }
    ],
    3: [
      { name: "contractions" }, { name: "possessives" }, { name: "oi" }, { name: "oy" }, { name: "oi/oy generalization" }, { name: "au" }, { name: "aw" }, { name: "au/aw generalization" }, 
      { name: "ou" }, { name: "ie" }, { name: "ea bread" }, { name: "ea steak" }, { name: "ie piece" }, { name: "igh" }, { name: "ph" }, { name: "vowel consonant 1" }, { name: "vowel consonant 2" }, 
      { name: "vowel consonant 3" }, { name: "-es" }, { name: "-ly" }, { name: "-est" }, { name: "ce" }, { name: "ci" }, { name: "cy" }, { name: "ge" }, { name: "gy" }, { name: "gi" }, { name: "-tion" }, { name: "-sion (shun)" }, 
      { name: "-sion (zhun)" }, { name: "-ment" }, { name: "-ful" }, { name: "-ness" }, { name: "-ish" }, { name: "-en" }, { name: "-less" }, { name: "schwa a" }, { name: "schwa i" }, { name: "doubling rule" }, 
      { name: "assessment" }
    ],
    4: [
      { name: "ple" }, { name: "ble" }, { name: "cle" }, { name: "dle" }, { name: "fle" }, { name: "gle" }, { name: "tle" }, { name: "kle" }, { name: "dge" }, { name: "dge and ge" }, { name: "stle" }, { name: "ckle" }, { name: "v.v" }, 
      { name: "ei /e/ ceiling" }, { name: "ew /u/ few" }, { name: "ew /oo/ grew" }, { name: "ui /oo/ juice" }, { name: "ei /a/ vein" }, { name: "ey /a/ they" }, 
      { name: "ue /u/ rescue" }, { name: "ue /oo/ true" }, { name: "eigh /a/ eight" }, { name: "y-e /i/ type" }, { name: "un-" }, { name: "re-" }, { name: "dis-" }, { name: "pro-" }, 
      { name: "cor-" }, { name: "con-" }, { name: "com-" }, { name: "con drops n" }, { name: "de-" }, { name: "pre-" }, { name: "sub-" }, { name: "trans-" }, { name: "non-" }, { name: "silent e rule" }, 
      { name: "y rule" }, { name: "doubling rule" }, { name: "struct" }, { name: "tract" }, { name: "port" }, { name: "ject" }, { name: "miss" }, { name: "mit" }, { name: "spire" }, { name: "scrib" }, 
      { name: "script" }, { name: "-sed-" }, { name: "-sit-" }, { name: "-sess-" }, { name: "act" }, { name: "dic" }, { name: "dict" }, { name: "fin" }, { name: "rupt" }, { name: "spect" }, { name: "spec" }, { name: "spic" }, 
      { name: "gram" }, { name: "graph" }, { name: "meter" }, { name: "metre" }, { name: "vers" }, { name: "vert" }, { name: "fer" }, { name: "cid/cis" }, { name: "form" }, { name: "Level 4 Assessment" }
    ],
    5: [
      { name: "rh" }, { name: "kn" }, { name: "gh" }, { name: "wr" }, { name: "gn" }, { name: "mb" }, { name: "gu" }, { name: "mn" }, { name: "ch /k/" }, { name: "ch /sh/" }, { name: "y /i/" }, { name: "o /u/ mother" }, 
      { name: "i /e/ studio" }, { name: "ive /iv/" }, { name: "u /u/ pull" }, { name: "ale" }, { name: "ton" }, { name: "om" }, { name: "que /k/" }, { name: "qu says /k/" }, { name: "gue /g/" }, 
      { name: "wa /wo/" }, { name: "qua /kwo/" }, { name: "ou /u/" }, { name: "augh /ot/" }, { name: "ough /ot/" }, { name: "ouar /er/" }, { name: "or /er/" }, { name: "oar /or/" }, 
      { name: "ear /er/" }, { name: "ear /ar/" }, { name: "quar /wor/" }, { name: "sc /s/" }, { name: "ti /sh/" }, { name: "ci /sh/" }, { name: "tu /choo/" }, { name: "age /aj/" }, 
      { name: "ain /en/" }, { name: "ture /cher/" }, { name: "ous /es/" }, { name: "cial /shel/" }, { name: "tial /shel/" }, { name: "ance /ence/" }, { name: "ence /ence/" }, 
      { name: "cal /kel/" }, { name: "cle /kel/" }, { name: "cian /shen/" }, { name: "able /ebl/" }, { name: "ible /ebl/" }, { name: "ate /it/" }, { name: "alt" }, { name: "en /en/" }, 
      { name: "alk /olk/" }, { name: "ty /te/" }, { name: "ive /ev/" }, { name: "el /ul/" }, { name: "age /ij/" }, { name: "ious" }, { name: "iate /e/at" }, { name: "ible" }, { name: "ial /e l/" }
    ]
};