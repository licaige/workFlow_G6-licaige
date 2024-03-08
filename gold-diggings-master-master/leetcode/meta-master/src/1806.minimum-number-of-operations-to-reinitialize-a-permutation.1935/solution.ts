function reinitializePermutation (n: number): number {
    const map:{
        [x:number]:number
    } = {
        2: 1,
        4: 2,
        6: 4,
        8: 3,
        10: 6,
        12: 10,
        14: 12,
        16: 4,
        18: 8,
        20: 18,
        22: 6,
        24: 11,
        26: 20,
        28: 18,
        30: 28,
        32: 5,
        34: 10,
        36: 12,
        38: 36,
        40: 12,
        42: 20,
        44: 14,
        46: 12,
        48: 23,
        50: 21,
        52: 8,
        54: 52,
        56: 20,
        58: 18,
        60: 58,
        62: 60,
        64: 6,
        66: 12,
        68: 66,
        70: 22,
        72: 35,
        74: 9,
        76: 20,
        78: 30,
        80: 39,
        82: 54,
        84: 82,
        86: 8,
        88: 28,
        90: 11,
        92: 12,
        94: 10,
        96: 36,
        98: 48,
        100: 30,
        102: 100,
        104: 51,
        106: 12,
        108: 106,
        110: 36,
        112: 36,
        114: 28,
        116: 44,
        118: 12,
        120: 24,
        122: 110,
        124: 20,
        126: 100,
        128: 7,
        130: 14,
        132: 130,
        134: 18,
        136: 36,
        138: 68,
        140: 138,
        142: 46,
        144: 60,
        146: 28,
        148: 42,
        150: 148,
        152: 15,
        154: 24,
        156: 20,
        158: 52,
        160: 52,
        162: 33,
        164: 162,
        166: 20,
        168: 83,
        170: 156,
        172: 18,
        174: 172,
        176: 60,
        178: 58,
        180: 178,
        182: 180,
        184: 60,
        186: 36,
        188: 40,
        190: 18,
        192: 95,
        194: 96,
        196: 12,
        198: 196,
        200: 99,
        202: 66,
        204: 84,
        206: 20,
        208: 66,
        210: 90,
        212: 210,
        214: 70,
        216: 28,
        218: 15,
        220: 18,
        222: 24,
        224: 37,
        226: 60,
        228: 226,
        230: 76,
        232: 30,
        234: 29,
        236: 92,
        238: 78,
        240: 119,
        242: 24,
        244: 162,
        246: 84,
        248: 36,
        250: 82,
        252: 50,
        254: 110,
        256: 8,
        258: 16,
        260: 36,
        262: 84,
        264: 131,
        266: 52,
        268: 22,
        270: 268,
        272: 135,
        274: 12,
        276: 20,
        278: 92,
        280: 30,
        282: 70,
        284: 94,
        286: 36,
        288: 60,
        290: 136,
        292: 48,
        294: 292,
        296: 116,
        298: 90,
        300: 132,
        302: 42,
        304: 100,
        306: 60,
        308: 102,
        310: 102,
        312: 155,
        314: 156,
        316: 12,
        318: 316,
        320: 140,
        322: 106,
        324: 72,
        326: 60,
        328: 36,
        330: 69,
        332: 30,
        334: 36,
        336: 132,
        338: 21,
        340: 28,
        342: 10,
        344: 147,
        346: 44,
        348: 346,
        350: 348,
        352: 36,
        354: 88,
        356: 140,
        358: 24,
        360: 179,
        362: 342,
        364: 110,
        366: 36,
        368: 183,
        370: 60,
        372: 156,
        374: 372,
        376: 100,
        378: 84,
        380: 378,
        382: 14,
        384: 191,
        386: 60,
        388: 42,
        390: 388,
        392: 88,
        394: 130,
        396: 156,
        398: 44,
        400: 18,
        402: 200,
        404: 60,
        406: 108,
        408: 180,
        410: 204,
        412: 68,
        414: 174,
        416: 164,
        418: 138,
        420: 418,
        422: 420,
        424: 138,
        426: 40,
        428: 60,
        430: 60,
        432: 43,
        434: 72,
        436: 28,
        438: 198,
        440: 73,
        442: 42,
        444: 442,
        446: 44,
        448: 148,
        450: 224,
        452: 20,
        454: 30,
        456: 12,
        458: 76,
        460: 72,
        462: 460,
        464: 231,
        466: 20,
        468: 466,
        470: 66,
        472: 52,
        474: 70,
        476: 180,
        478: 156,
        480: 239,
        482: 36,
        484: 66,
        486: 48,
        488: 243,
        490: 162,
        492: 490,
        494: 56,
        496: 60,
        498: 105,
        500: 166,
        502: 166,
        504: 251,
        506: 100,
        508: 156,
        510: 508,
        512: 9,
        514: 18,
        516: 204,
        518: 230,
        520: 172,
        522: 260,
        524: 522,
        526: 60,
        528: 40,
        530: 253,
        532: 174,
        534: 60,
        536: 212,
        538: 178,
        540: 210,
        542: 540,
        544: 180,
        546: 36,
        548: 546,
        550: 60,
        552: 252,
        554: 39,
        556: 36,
        558: 556,
        560: 84,
        562: 40,
        564: 562,
        566: 28,
        568: 54,
        570: 284,
        572: 114,
        574: 190,
        576: 220,
        578: 144,
        580: 96,
        582: 246,
        584: 260,
        586: 12,
        588: 586,
        590: 90,
        592: 196,
        594: 148,
        596: 24,
        598: 198,
        600: 299,
        602: 25,
        604: 66,
        606: 220,
        608: 303,
        610: 84,
        612: 276,
        614: 612,
        616: 20,
        618: 154,
        620: 618,
        622: 198,
        624: 33,
        626: 500,
        628: 90,
        630: 72,
        632: 45,
        634: 210,
        636: 28,
        638: 84,
        640: 210,
        642: 64,
        644: 214,
        646: 28,
        648: 323,
        650: 290,
        652: 30,
        654: 652,
        656: 260,
        658: 18,
        660: 658,
        662: 660,
        664: 24,
        666: 36,
        668: 308,
        670: 74,
        672: 60,
        674: 48,
        676: 180,
        678: 676,
        680: 48,
        682: 226,
        684: 22,
        686: 68,
        688: 76,
        690: 156,
        692: 230,
        694: 30,
        696: 276,
        698: 40,
        700: 58,
        702: 700,
        704: 36,
        706: 92,
        708: 300,
        710: 708,
        712: 78,
        714: 55,
        716: 60,
        718: 238,
        720: 359,
        722: 51,
        724: 24,
        726: 140,
        728: 121,
        730: 486,
        732: 56,
        734: 244,
        736: 84,
        738: 330,
        740: 246,
        742: 36,
        744: 371,
        746: 148,
        748: 246,
        750: 318,
        752: 375,
        754: 50,
        756: 60,
        758: 756,
        760: 110,
        762: 380,
        764: 36,
        766: 24,
        768: 348,
        770: 384,
        772: 16,
        774: 772,
        776: 20,
        778: 36,
        780: 180,
        782: 70,
        784: 252,
        786: 52,
        788: 786,
        790: 262,
        792: 84,
        794: 60,
        796: 52,
        798: 796,
        800: 184,
        802: 66,
        804: 90,
        806: 132,
        808: 268,
        810: 404,
        812: 270,
        814: 270,
        816: 324,
        818: 126,
        820: 12,
        822: 820,
        824: 411,
        826: 20,
        828: 826,
        830: 828,
        832: 92,
        834: 168,
        836: 332,
        838: 90,
        840: 419,
        842: 812,
        844: 70,
        846: 156,
        848: 330,
        850: 94,
        852: 396,
        854: 852,
        856: 36,
        858: 428,
        860: 858,
        862: 60,
        864: 431,
        866: 172,
        868: 136,
        870: 390,
        872: 132,
        874: 48,
        876: 300,
        878: 876,
        880: 292,
        882: 55,
        884: 882,
        886: 116,
        888: 443,
        890: 21,
        892: 270,
        894: 414,
        896: 356,
        898: 132,
        900: 140,
        902: 104,
        904: 42,
        906: 180,
        908: 906,
        910: 300,
        912: 91,
        914: 410,
        916: 60,
        918: 390,
        920: 153,
        922: 102,
        924: 420,
        926: 180,
        928: 102,
        930: 464,
        932: 126,
        934: 310,
        936: 40,
        938: 117,
        940: 156,
        942: 940,
        944: 220,
        946: 36,
        948: 946,
        950: 36,
        952: 316,
        954: 68,
        956: 380,
        958: 140,
        960: 204,
        962: 155,
        964: 318,
        966: 96,
        968: 483,
        970: 72,
        972: 194,
        974: 138,
        976: 60,
        978: 488,
        980: 110,
        982: 36,
        984: 491,
        986: 196,
        988: 138,
        990: 154,
        992: 495,
        994: 30,
        996: 396,
        998: 332,
        1000: 36,
    };
    return map[n];
}
