const Http = require('http'),
  fs = require('fs'),
  path = require('path'),
  readline = require('readline'),
  os = require('os');

instAll = [
  15890655003477913,
  15917865009187760,
  15930821245168534,
  15949743338644220,
  16236181211342354,
  16303324355390262,
  16315910303613772,
  16369313804633525,
  16405556680571453,
  16410724132711490,
  16450303698254968,
  16553062355259729,
  16596558163548546,
  16673205196919832,
  16693610252404739,
  16722829326716163,
  16777570760181431,
  16926167850758964,
  16959429956899455,
  17059960254855208,
  17253288173262089,
  17269972595370241,
  38166945723865485,
  38179358042686391,
  38436612777305077,
  38437201078089290,
  38547060135156069,
  38555056423456635,
  38568786927478796,
  38738476064699383,
  39116664428676213,
  39171819040364290,
  39258556256580392,
  39436183727126211,
  39453972158399542,
  39481233087768672,
  39604494485558197,
  39721109617818727,
  39751275523025334,
  39801771451196931,
  39807886630843041,
  40025799067544201,
  40043919653526083,
  40124428756742341,
  40149463639215650,
  55201604487356053,
  55254206302462116,
  55467634116176302,
  55511667328361694,
  55848849021200650,
  55897939403232751,
  55959112038778737,
  55963441389800122,
  55979741213594029,
  56006915451245411,
  56033738624803469,
  56310719983603374,
  56324206651661881,
  56394387537858740,
  56429431740318486,
  56550776668133562,
  56574323121551263,
  56591881518499520,
  56717416662584054,
  56798822689379375,
  56820995669577571,
  56881993417852599,
  56918976818189623,
  70268234645479100,
  70270965300262393,
  70273912000644230,
  70289374539527245,
  70427037538843530,
  70474983732269112,
  70498485598181604,
  70536742481884960,
  70595828753641750,
  70934270174405743,
  71290297158948749,
  71510396252618330,
  71523986304961239,
  71577346467108601,
  71666521540545716,
  71672399601682259,
  71744682148776880,
  71772000724177515,
  71856634742001725,
  71901111301490182,
  71957984642204570,
  57045971995913921,
  57076944665294912,
  57082592909752827,
  57086055330734195,
  57139694841580593,
  57273529732791251,
  57309221039930244,
  57315995490037695,
  57345466642512800,
  57355705829298012,
  57487343869808400,
  57513265745691613,
  57551382352708199,
  57600064931636077,
  57639364758870873,
  57722642338781674,
  57761388729898548,
  57875847776839336,
  57944184894703821,
  58035444268544991,
  58168796811562695,
  58180284328186631,
  40262275031537922,
  40411537531154482,
  40483499097200406,
  40601326015230157,
  40611478183231802,
  40650252484299134,
  40808043719554948,
  40873181245119707,
  41048299027409941,
  41227201752535311,
  41284516796232939,
  41302553376174581,
  41309167317349268,
  41367130414585908,
  41379697187196382,
  41625340598198551,
  41713045190742691,
  41781090739318251,
  41796741644273824,
  41858326436945277,
  41898828400781536,
  41935584690956944,
  41974758296041288,
  17284166795866794,
  17330546482145553,
  17392781708705080,
  17528249960294496,
  17617474823279712,
  17661113951261114,
  17800036702302776,
  17834623106317041,
  17933573078185644,
  17939384202383793,
  17941426325664429,
  18004480270695404,
  18027801615184692,
  18063426072758458,
  18067743398074470,
  18093681647131179,
  18254797987120774,
  18275313863657221,
  18297628506482242,
  18303237082155264,
  18346219759153870,
  18401147983387689,
  18452085181471587,
  18568915061663137,
  18599703143458101,
  18683861709119246,
  18822704361279128,
  18883380772506226,
  19024886606470752,
  19040514831923530,
  19257295292088310,
  19298748452450329,
  19345501999441412,
  19367527798307032,
  19422860143693289,
  19471788163911687,
  19770002713966079,
  19839750988634567,
  19905430374943557,
  19950220183244479,
  19954896371640204,
  20024911381434086,
  20034264486679145,
  20231352929983345,
  42022764536820665,
  42031056662310763,
  42048284100043602,
  42049553761321495,
  42075223783409640,
  42084263157016079,
  42354736493447489,
  42387718866026650,
  42513436875973251,
  42576718434222894,
  42690477960659940,
  42696242981550091,
  43011425648439874,
  43039599691270215,
  43062880954780884,
  43283802997035462,
  43291783149314349,
  43302120046092316,
  43342306308122676,
  43362635835198978,
  43374709930371268,
  43545527030854340,
  43552974795606067,
  58228796315213346,
  58350598634599038,
  58474277119959628,
  58562083282004793,
  58602432837130018,
  58741071099161284,
  58931793851445922,
  59142194115401696,
  59203771713612706,
  59217041815333317,
  59266699437480384,
  59342912854668427,
  59486059679335017,
  59524465288678331,
  59525964192678026,
  59598228906194285,
  59598536122397373,
  59607545337891226,
  59612098290740355,
  59623289100408647,
  59735609117437896,
  59800986739603675,
  22129017544200,
  143187001116603,
  318005355896147,
  350097973599097,
  408934423224097,
  557272120878932,
  611986653700161,
  685553375979058,
  778253364357513,
  793710053482057,
  831325835570803,
  881618880255065,
  898671485685327,
  917857106093847,
  1050751214677134,
  1072964149653157,
  1200391996585610,
  1601504922599756,
  1625149423498289,
  1686457989827207,
  1745829084228393,
  1806692551822666,
  1831214548277647,
  2147129961448440,
  2254054929817435,
  59839275647597021,
  59848307608894801,
  59866041653103343,
  59921975187856916,
  60061422939859083,
  60079434631497942,
  60115610575552097,
  60247433951600827,
  60326793235703126,
  60350996279289099,
  60435355925269868,
  60451823714332895,
  60523145697836739,
  60599922282667900,
  60610861509165508,
  60633055620418060,
  60654872678917533,
  60783654574662426,
  60847854898533511,
  61062392807810466,
  61102694810476197,
  61170189647376533,
  20393717141867821,
  20411759370751096,
  20453828618330936,
  20478235308214741,
  20487994977117557,
  20560887114747719,
  20562694899904339,
  20865316761157979,
  20909901812271390,
  20926459161497908,
  20946530370469828,
  20966291817819448,
  21166660564301770,
  21227813276368514,
  21388492749900591,
  21426277483799140,
  21522990643077548,
  21607242972640064,
  22032666478119723,
  22053520189380303,
  22056192338521781,
  22086876724551482,
  22087269603540841,
  22164355468450959,
  22165087431350358,
  22255783119783047,
  22260326095996531,
  22275596386264204,
  22299894048845903,
  22308305646551497,
  22380773158602080,
  22382156782768756,
  22490169030401337,
  22560050433388046,
  22667016906590506,
  22787503301679573,
  22811176775480091,
  22839330962768817,
  22903901709044823,
  22941065011246116,
  22950683624908253,
  22956708386610464,
  22987468793591331,
  22991966099258944,
  23049019886587905,
  23086515493897579,
  23175320865252772,
  23214828924506640,
  43622578471330344,
  43627645917394386,
  43698529901834726,
  43716452378323683,
  43749359039031456,
  43781018754867729,
  43801363961831435,
  43913530989262989,
  43951910415124966,
  43966385447049549,
  43980443266547806,
  44013656953678055,
  44052047028305231,
  44153164692325703,
  44296315953738727,
  44549439964296944,
  44625249840480397,
  44665761767777759,
  44802346787824971,
  44818950263583523,
  44850033148208596,
  44891482026867833,
  44932707349406333,
  23293437377896568,
  23353689102956991,
  23441366113375722,
  23458117616920867,
  23581215918684761,
  23600798892801694,
  23695001747840020,
  23791232955302467,
  23837844039713715,
  23838634016123354,
  23891830829322971,
  23936607891892333,
  24018878640527909,
  24079409192818584,
  24085906177899789,
  24212636157410845,
  24254843881948059,
  24281171372342444,
  24303422207378456,
  24629175613222028,
  24644999329120295,
  24662567615903665,
  24807173016704795,
  2318736941376687,
  2328862017676109,
  2434703913394836,
  2494676402960383,
  2589887561569709,
  2849875720026255,
  2888358730233310,
  2929948497881810,
  2944500421562364,
  3149396562827132,
  3173544097113770,
  3176699243034971,
  3453027360500664,
  3492952121304423,
  3493306453706327,
  3543463040833413,
  3622735179834649,
  3623921205367364,
  3654864906585643,
  3722699128879020,
  3823243780502959,
  3826561665587230,
  3863538898378476,
  24832515281647747,
  24854455175613815,
  24869832924911721,
  25001509088465005,
  25167449580509543,
  25180702353416009,
  25215182208950217,
  25244329144808274,
  25286509736208688,
  25336820825905643,
  25357135030606405,
  25435625417909263,
  25514780181345713,
  25631699615003698,
  25725323454526546,
  25758309844190279,
  26014913469567886,
  26259366519412975,
  26336598784230831,
  26543014712914772,
  26547785441834730,
  26824673819862694,
  44967158778304588,
  44986797317463049,
  45042869458982253,
  45050389997905274,
  45062188442385800,
  45066064863062755,
  45174198424472334,
  45205530868811305,
  45353549301778828,
  45452485689363029,
  45518744711972166,
  45728383369147894,
  45747858932368314,
  45895339414786358,
  46178280540110577,
  46287096702853935,
  46348559193224090,
  46435139220938109,
  46565737950212978,
  46700660505281786,
  46741025610365786,
  46752599569017089,
  61218005473404311,
  61332057061846617,
  61355897526163116,
  61369328533907950,
  61492922424375325,
  61496765427212157,
  61506294208022391,
  61506473958237003,
  61664227282090067,
  61704081214633396,
  61731388465798074,
  61948819034785721,
  62001406407337461,
  62012736978844991,
  62177651435283872,
  62258804563636993,
  62280970570430885,
  62346804681275278,
  62533312115574246,
  62603302940123327,
  62776586713114508,
  62786156501584862,
  26927142986179586,
  26975313673310117,
  26997316501080743,
  27000326841257664,
  27096851668435724,
  27148595522452496,
  27218386411183410,
  27237407271391991,
  27259484209117565,
  27299841173245405,
  27308217070238237,
  27338175838625962,
  27361263980884014,
  27657893524911817,
  27668158733246204,
  27814844870305607,
  27857905114371789,
  27922860956133067,
  27952969918967492,
  28025154952452710,
  28033133021443774,
  28225191059722925,
  28230238564334914,
  28251956446987982,
  28253678449273505,
  28320293733348826,
  28325731560106431,
  28328710198554144,
  28431095903407567,
  28450080638096732,
  28672095850798501,
  28788598290160782,
  28809886765682162,
  28845264556937486,
  28854105556435129,
  28864540805361867,
  29122854902865456,
  29247915161590165,
  29316948750916349,
  29512568608949554,
  29527985620948695,
  29599448627202650,
  29747059672582491,
  29758477602878557,
  29860265627578401,
  29882244560576007,
  29932120566634962,
  30231789123900526,
  30282299500988269,
  62952165421099192,
  62977319271289925,
  63084741752814852,
  63200220478673626,
  63310105340116493,
  63315013743060811,
  63363116407864462,
  63380098535169030,
  63481599728522324,
  63499217872110599,
  63580313877463104,
  63704201144621295,
  63830424809501048,
  63915926161403347,
  63917421733088077,
  63965059137798192,
  64147416931510702,
  64155926828410021,
  64289770858657141,
  64297895374219715,
  64298008532791199,
  64341992373049080,
  64358061873294912,
  46772701938567445,
  46773487536596471,
  46830341954511303,
  46982154647719707,
  46988708892096925,
  47032744541940828,
  47101579271117172,
  47232550823972469,
  47302318535715632,
  47333458678352378,
  47348197320716810,
  47377315952751604,
  47638138090419261,
  47702059190622416,
  47749661205825616,
  47841327496247362,
  47896588446553602,
  47996917271187218,
  48004464435679262,
  48010225447410247,
  48018896135442083,
  48043180063638654,
  30506910505599743,
  30507152381699953,
  30650426998863332,
  30703140537034664,
  30719054967088301,
  30765727085936322,
  30812750556497648,
  30829203706095076,
  30852391633490755,
  30974710508383145,
  31024260997481994,
  31049085025064185,
  31078457170311964,
  31316784129157162,
  31366347648583654,
  31529399361341835,
  31791737198597563,
  31879190587976736,
  31928933749228545,
  32194839454720154,
  32257753560585502,
  32357363984168442,
  32391119028236636,
  4146533087427956,
  4159532151694984,
  4222940553343735,
  4247709727327181,
  4338173689017034,
  4384288570322406,
  4434125509381536,
  4470657233334072,
  4507558419857064,
  4528607775462304,
  4563413583000719,
  4614779520007780,
  4659957480182399,
  4686607974846832,
  4733285133017464,
  4758266259250794,
  4942127026063388,
  5054819322815158,
  5126621656875241,
  5128151910501174,
  5187018329202415,
  5203880991539408,
  5305844922895340,
  5317427172344706,
  5356235529197871,
  5427792638736934,
  5496756629230306,
  5516102131364383,
  5547896159175454,
  5564768007356822,
  5657981336716226,
  5752911028185578,
  5816763371299689,
  5866848234665627,
  6043384171800349,
  6110133418282108,
  6131290133202745,
  6183017539978894,
  6303151084068271,
  6433335428452486,
  6478064539164167,
  6506179926371994,
  6710089299473179,
  6757220448540984,
  6847536925606808,
  6951212170412722,
  32453604314166518,
  32485331963372577,
  32525655729432562,
  32678431934327184,
  32720869232127706,
  32821908911812078,
  32845891587040106,
  32905574440152196,
  32982652838367432,
  33254899395816171,
  33293588228706998,
  33406621820337161,
  33420285433308219,
  33512084144201783,
  33521509676474411,
  33541897671561960,
  33603212156438463,
  33611155027418901,
  33629260529503413,
  33683240001985963,
  33736447482634583,
  33783140337377394,
  33808206014018431,
  48102697378515196,
  48287670503317419,
  48338606859106961,
  48456605452591386,
  48460161182549846,
  48511238766369097,
  48623320733330408,
  48731351079431981,
  48762046694019828,
  48990026850202503,
  49040900499589053,
  49054891736433700,
  49098888060352140,
  49100528005631270,
  49129081625829210,
  49129335444633619,
  49188729526980541,
  49208227309752531,
  49244604018250364,
  49353447565507376,
  49399017998386087,
  49502666250908008,
  64474894785552088,
  64485827086284311,
  64551943070423993,
  64699417405634265,
  64707090254488560,
  64842837716888827,
  64843936383937546,
  64873834329578022,
  64942549055019553,
  65004959184388996,
  65018804181564924,
  65023851436340574,
  65122215875355555,
  65235779374464744,
  65321970913593427,
  65339948604901401,
  65372898104738885,
  65414507129586385,
  65472108074101196,
  65490886290565185,
  65647223172013387,
  65658464061006386,
  6975987075611442,
  7183333492448248,
  7235435095059069,
  7300125658580126,
  7385624172574740,
  7395271748414592,
  7407628350690073,
  7457232989848872,
  7459984729700117,
  7483280423474368,
  7503669593172728,
  7505990056227818,
  7628308021169118,
  7666290855904557,
  7711282667602555,
  7715968593254705,
  7745894403636165,
  7769065543658313,
  7902182071079987,
  7920014658832193,
  7938904494569702,
  8058238145558609,
  8139873208095439,
  8174243655864577,
  8300819169359763,
  8499362984471239,
  8532017750167668,
  8646067353086740,
  8873173965132573,
  8915450910866216,
  8977369674477111,
  8977441217024425,
  8981227815720204,
  9211775239375291,
  9322644336320024,
  9481703061634967,
  9536587154100457,
  9586715245691917,
  9657290597210645,
  9698674686691945,
  9761381741308262,
  9987529074833218,
  10024128313803797,
  10055255678920880,
  10120557300120078,
  10145129193828624,
  10209600627455855,
  10339760823334065,
  65671173927025645,
  65676208671737936,
  65883838195688438,
  65913670626064922,
  65996297871759754,
  65999092673039059,
  66017397299787592,
  66021783818850713,
  66036975502302203,
  66046546158122553,
  66127247173352975,
  66142616039907394,
  66179488055896182,
  66210395067138534,
  66267556240343441,
  66295665969375744,
  66362433671981035,
  66450490505950110,
  66456062140680461,
  66514709341259550,
  66599109405217136,
  66682662312253625,
  49507346707445426,
  49627523909849331,
  49674915481184052,
  49953653111442595,
  50002340308486819,
  50100062518826135,
  50117925085549635,
  50185721305191887,
  50235687797910703,
  50238560007840795,
  50341528161302545,
  50368344235826302,
  50547667960799833,
  50580753680043015,
  50633804639547462,
  50652985928800943,
  50659224705136694,
  50689220001642146,
  50792786683910016,
  51106317433079213,
  51199734387556694,
  51244286061307960,
  51294484197536070,
  33854964748757477,
  33887145736684266,
  33889280063931972,
  33931218652865616,
  34032872653290886,
  34144169196077484,
  34144395039913458,
  34303815391827420,
  34540569618314880,
  34557241988629814,
  34565348191664379,
  34621618468546063,
  34641719089573667,
  34673681828119297,
  34718633636164421,
  34721884030854211,
  34743062472637188,
  34757379158309424,
  34776415527452961,
  34890845654517313,
  34958397778580226,
  35154825591409553,
  35158826900216508,
  10427474943853556,
  10568944722570445,
  10574526790623372,
  10587984591234722,
  10654052153538617,
  10795723506538053,
  10831074117626896,
  11019264549255051,
  11258722998911897,
  11332953223903902,
  11403770140000603,
  11427939669935844,
  11432067920374603,
  11555144562661058,
  11560002870991149,
  11615434537014226,
  11622051128546106,
  11773403764702778,
  11918692018527792,
  11927496285559135,
  11964419322927535,
  12041217376571987,
  12089903491411130,
  12303918642491681,
  12329519546621752,
  12329915567896606,
  12387472624849835,
  12390706505809150,
  12638840758449459,
  12746730665870442,
  12752224677923341,
  12777578088653944,
  12834590966328209,
  12874072841236826,
  12901875871456398,
  12965822877128721,
  13227300125161435,
  13235547361447092,
  13243992182070788,
  13281937213456378,
  13611044044646901,
  13688910352288869,
  13891373690607361,
  13937270451301973,
  14073782708315535,
  35178706978554988,
  35188369797280638,
  35366681030756042,
  35369183060321179,
  35424116338766901,
  35425587644337450,
  35445515321658835,
  35448830065044256,
  35536906491241630,
  35541297751844500,
  35557019220393916,
  35669480110084448,
  35700344742885862,
  35714741066489959,
  35757908588761589,
  35964395659427029,
  36043751160770114,
  36045669822709476,
  36114820296594545,
  36273975537785965,
  36360223139541905,
  36385738315834272,
  51326819277232892,
  51443230896454947,
  51459202425114449,
  51617145873056483,
  51716260276805622,
  51971068201094874,
  52011547716040734,
  52206600101613041,
  52220424531578944,
  52232388263291380,
  52365266148848270,
  52382684379473036,
  52455922800537930,
  52524682936687613,
  52570451223886223,
  52593789542874668,
  52649373877751075,
  52792903131341205,
  52918896269335741,
  52975109254504632,
  53063537318825089,
  53113471126689455,
  66701874099226162,
  66726992874614788,
  66772024744156373,
  66818022341772870,
  66830065858417081,
  67030488744129337,
  67126881188552864,
  67170215467608124,
  67206358287598044,
  67293053847780742,
  67327029014085707,
  67612261115225625,
  67690708346979840,
  67744724115735698,
  67988012428906654,
  68000021842531234,
  68100208083371998,
  68117765376081366,
  68160082155090291,
  68173617610155086,
  68203878405672734,
  68463158888337595,
  68488673556087148,
  68517032834363488,
  68635710163497089,
  68703232224977945,
  68846812677163892,
  68909035712962732,
  68994573424108746,
  69067576215760005,
  69090868458637360,
  69128417179706303,
  69143674941561637,
  69340371856300801,
  69399924050316081,
  69446467464337052,
  69454539056549106,
  69791212738327934,
  69842402826410870,
  69845771007314681,
  69847139870135237,
  69858202392669780,
  70077718812239609,
  70199760472172539,
  53204330224889981,
  53249498382937694,
  53251602435454519,
  53386557442420539,
  53419976284977130,
  53449700212786324,
  53482856220074779,
  53647874954005806,
  53686258677793038,
  53892173815383358,
  53999651992586159,
  54263829393913132,
  54277068923045214,
  54369290104873523,
  54419429862704331,
  54424603805821073,
  54459121997806875,
  54482686501491508,
  54509759694064219,
  54676885047867737,
  54882843915599119,
  54995459397811265,
  36592972482259020,
  36609406760796639,
  36773155987365094,
  36899214178084525,
  36907311539363760,
  36958631592317557,
  37089435663285178,
  37114514127305200,
  37148101999680137,
  37198734218751769,
  37204371816016200,
  37265372961114371,
  37281199178613855,
  37366608481858080,
  37389789764168256,
  37594607294781281,
  37614886280396031,
  37631109616997982,
  37842793167868642,
  37958857929299636,
  38066740861554557,
  38084304113529336,
  14231831499205396,
  14246499353718425,
  14312030900097668,
  14398278072324784,
  14602532410168192,
  14798249266057986,
  14800142337291217,
  14957056743925737,
  14985138705106402,
  15039949673085566,
  15104514320925915,
  15221664222769132,
  15259343650667588,
  15324020389819964,
  15374483986949695,
  15424938732223941,
  15451317146134956,
  15472396110662150,
  15521712617204216,
  15589565387552095,
  15726796686853780,
  15826229869421585,
];

const axios = require('axios');
let histSendCntr = 0,
  histRecvCntr = 0,
  histError = 0;

async function GetPClosing() {
  let HistPr = new Promise((res, rej) => {
    instAll
      .filter((v, i) => i < 10)
      .forEach((v, i) => {
        url =
          'http://www.tsetmc.com/tsev2/data/instinfodata.aspx?i=' +
          v +
          '&c=44+';
        histSendCntr++;
        axios
          .get(url)
          .then(response => {
            histRecvCntr++;
            console.log('pageOk = ', i);
            if (histRecvCntr == histSendCntr) {
              res(1);
            }
            pClosing = response.data.split(';')[0].split(',')[2];
            console.log('pClosing = ', pClosing);
          })
          .catch(error => {
            console.log('histError = ', i);
            histRecvCntr++;
            if (histRecvCntr == histSendCntr) {
              res(1);
            }
          });
      });
  });

  await HistPr;
}

histSendCntr = 0;
histRecvCntr = 0;
histError = 0;

async function GetSymbolPage() {
  let HistPr = new Promise((res, rej) => {
    instAll
      .filter((v, i) => i < 10)
      .forEach((v, i) => {
        url = 'http://www.tsetmc.com/loader.aspx?ParTree=151311&i=' + v;
        histSendCntr++;
        axios
          .get(url)
          .then(response => {
            histRecvCntr++;
            console.log('pageOk = ', i);
            if (histRecvCntr == histSendCntr) {
              res(1);
            }
            let body = response.data;

            var regex = /LSecVal='(.*?)',Cg/g;
            match = regex.exec(body);
            csName = match[1];
            console.log('csName = ', csName);
          })
          .catch(error => {
            console.log('histError = ', i);
            histRecvCntr++;
            if (histRecvCntr == histSendCntr) {
              res(1);
            }
          });
      });
  });

  await HistPr;
}
GetPClosing();
GetSymbolPage();