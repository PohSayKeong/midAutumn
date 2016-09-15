// app/routes.js
module.exports = function(app, passport) {
	
	var db, collection;
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var uri = "mongodb://SKnai:SKnai@ds027896.mlab.com:27896/midautumn";

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });


    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
	
var questions =[
{question:"中秋节是在每年的？", option1: "八月十五", option2: "九月十六", answer:"八月十五",id:1},
{question:"中秋节吃什么？", option1: "粽子", option2: "月饼", answer:"月饼",id:2},
{question:"在中秋节， 吃月饼的习俗是在多少年前开始的？", option1: "650年前", option2: "550年前", answer:"650年前",id:7},
{question:"“中秋” 这个词最早记载在哪本书里？", option1: "《唐礼》", option2: "《周礼》", answer:"《周礼》",id:8},
{question:"中秋节始于那个朝代？", option1: "唐朝", option2: "明朝", answer:"唐朝",id:9},
{question:"为什么叫做“中秋节”", option1: "因为来自中国", option2: "因为在秋季过了半才庆祝", answer:"因为在秋季过了半才庆祝",id:13},
{question:"古代的诗人喜欢在中秋节做什么？", option1: "写关于月亮的诗", option2: "吃月饼", answer:"写关于月亮的诗",id:14},
{question:"什么水果经常在中秋节吃？", option1: "柚子", option2: "苹果", answer:"柚子",id:15},
{question:"以下故事中，哪一个跟中秋节的传说无关？", option1: "嫦娥奔月", option2: "屈原投江", answer:"屈原投江",id:19},
{question:"在古代月圆和月缺一般形容什么？", option1: "身体是否健康", option2: "悲欢离合", answer:"悲欢离合",id:20},
{question:"月饼最初是用来做什么的?", option1: "祭奉月神的祭品", option2: "节日食品", answer:"祭奉月神的祭品",id:21},
{question:"中秋节的时候，小孩喜欢玩什么？", option1: "灯泡", option2: "灯笼", answer:"灯笼",id:26},
{question:"传说中是谁偷了仙丹，飞上了月亮？", option1: "后羿", option2: "嫦娥", answer:"嫦娥",id:27},
{question:"“春风又绿江南岸，明日何时照我还”是谁的佳作？", option1: "王安石", option2: "李白", answer:"王安石",id:28},
{question:"传说中，在广寒宫中陪伴嫦娥的动物是？", option1: "猴子", option2: "兔子", answer:"兔子",id:34},
{question:"床前明月光（猜一字）", option1:"旷",option2:"乡",answer:"旷",id:35},

{question:"中秋菊开（猜一成语）", option1:"花好月圆",option2:"庆中秋",answer:"花好月圆",id:36},

{question:"中秋鼓励消费（猜一成语）", option1:"月下花前",option2:"月下省钱",answer:"月下花前",id:37},

{question:"有时落在山腰，有时挂在树梢， 有时象面圆镜，有时象把镰刀。（猜一天体）", option1:"月亮",option2:"太阳",answer:"月亮",id:38},

{question:"平日不思，中秋想你，有方有圆，甜甜蜜蜜。（猜一食品名）", option1:"月饼",option2:"蛋糕",answer:"月饼",id:39},

{question:"太阳西边下，月亮东边挂。（猜一字）", option1:"明",option2:"日",answer:"明",id:40},

{question:"一面镜子亮晶晶，走遍天下照古今。", option1:"月亮",option2:"星星",answer:"月亮",id:41},

{question:"十五的月亮照沙滩（猜一成语）", option1:"一盘散沙",option2:"花好月圆",answer:"一盘散沙",id:42},

{question:"一弯月照枝头亮，两颗星悬天下明。（猜一字）", option1:"明",option2:"秋",answer:"秋",id:43},

{question:"华夏共赏中秋月（猜一旅游用语）", option1:"观剧",option2:"观光",answer:"观光",id:44},

{question:"在哪个朝代中秋节才开始成为固定的节日？", option1:"明",option2:"唐",answer:"唐",id:45},

{question:"嫦娥一号是中国的首颗绕月人造卫星。", option1:"对",option2:"错",answer:"对",id:46},

{question:"一弯月照枝头亮，两颗星悬天下明。（猜一字）", option1:"",option2:"",answer:"秋",id:47},

{question:"半个月亮", option1:"胖",option2:"弯",answer:"胖",id:48},

{question:"百年前的月亮", option1:"胡",option2:"朝",answer:"胡",id:49},

{question:"打开半个月亮，收到兜里可装", option1:"皮包",option2:"折扇",answer:"折扇",id:50},

{question:"哪一位诗人有写关于中秋节的诗?", option1:"李白",option2:"屈原",answer:"李白",id:51},

{question:"中秋节除了吃月饼，还会有什么食物？", option1:"汤圆",option2:"柚子",answer:"柚子",id:52},

{question:"嫦娥到了月亮后，仙丹变成了什么？", option1:"天宫",option2:"玉兔",answer:"玉兔",id:53},

{question:"后羿是从谁得到仙丹的？", option1:"玉皇大帝",option2:"西王母",answer:"西王母",id:54},

{question:"后羿为何得到仙丹？他射下了 __ 个太阳", option1:"九",option2:"十",answer:"九",id:55},

{question:"按照传统，中秋节起源于？", option1:"汉朝",option2:"宋朝",answer:"汉朝",id:56},

{question:"吃月饼的意义是什么?", option1:"团圆",option2:"幸福",answer:"团圆",id:57},

{question:"百年前的月亮（猜一个字）", option1:"胡",option2:"阳",answer:"胡",id:58},

{question:"“但愿人长久，千里共婵娟”出自哪位词人之手？", option1:"辛弃疾",option2:"苏轼",answer:"苏轼 ",id:59},

{question:"纸包得住火。（猜一节日物品）", option1:"灯笼 ",option2:"烟花",answer:"灯笼",id:60},

{question:"艳阳西下，皓月东挂。（猜一字）", option1:"胆",option2:"明",answer:"明",id:61},
{question:"神箭横日穿，从此愁心散。决心无二意，祝君笑容展。（猜一贺语）", option1:"中秋平安",option2:"中秋快乐",answer:"中秋快乐",id:62},

{question:"举头望明月（猜一中药名）", option1:"当归",option2:"月石",answer:"当归",id:63},

{question:"一轮明月挂中天（猜一股市术语）", option1:"日涨盈亏",option2:"上市股票",answer:"日涨盈亏",id:64},

{question:"明月一钩云脚下，残花两瓣马蹄前。（猜一字）", option1:"照",option2:"熊",answer:"熊",id:65},

{question:"皮也轻轻，骨也轻轻，心头轻轻，全身通明。（猜一物品）", option1:"路灯",option2:"灯笼",answer:"灯笼",id:66},

{question:"能说会道", option1:"圆",option2:"团",answer:"团",id:67},

{question:"一个黑小孩，自小口不开，偶然开一口，伸出舌头来。（猜一食品）", option1:"瓜子",option2:"黑籽麻",answer:"瓜子",id:68},

{question:"嫦娥为什么会飞到月亮上去？", option1:"她吞下后羿留下的仙丹。",option2:"她被兔子带上了月亮。",answer:"她吞下后羿留下的仙丹。",id:69},

{question:"中秋节又称为?", option1:"儿女节",option2:"月夕",answer:"月夕",id:70},

{question:"“月亮代表我的心” 这首歌是谁的作曲?", option1:"翁清渓",option2:"孙燕姿",answer:"翁清渓",id:71},

{question:"十字对十字，太阳对月亮。（猜一字）", option1:"朝",option2:"明",answer:"朝",id:72},
]
	
		var display = [];
	
	app.get('/admin', function(req, res) {

    console.log('Attempting to add into database.');
     mongodb.connect(uri, function(err, db) {
         var collection = db.collection('questions');
         collection.insertMany(questions,
             function(err, results){
                 res.send(results);
                 db.close();
             }
         );
     });
 });
	

	
    app.get('/quiz', isLoggedIn, function(req, res) {
		if (display != null){
			display = [];
		}
		var item1 = questions[Math.floor(Math.random()*questions.length)];
		var item2 = questions[Math.floor(Math.random()*questions.length)];
		var item3 = questions[Math.floor(Math.random()*questions.length)];
		display.push(item1);
		display.push(item2);
		display.push(item3);
        res.render('quiz.ejs', {
            questions: display // get the user out of session and pass to template
        });
    });
	
	app.post('/quiz', isLoggedIn, function(req, res) {
		// save quiz results to the database
		// maybe render the score of the user
		
		console.log(req.body);
		
		var responses = [
			{questionID: req.body.questionIndex1,
			response: req.body.question1},
			{questionID: req.body.questionIndex2,
			response: req.body.question2},
			{questionID: req.body.questionIndex3,
			response: req.body.question3}
		];
		
		// filter by mongodb id to get answers
		var answers = [
			display[0].answer,
			display[1].answer,
			display[2].answer
		]
		
		console.log(responses);	
		res.render('results.ejs', {
			responses: [responses[0].response, responses[1].response, responses[2].response],
			answers: answers,
			score: 0
		});
		
	});

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    
    // how to revoke token here to stop offline access request?
    // http://stackoverflow.com/questions/21405274/this-app-would-like-to-have-offline-access-when-access-type-online/29267449#29267
    // https://github.com/jaredhanson/passport/issues/42
    
    // http://www.riskcompletefailure.com/2013/12/are-you-using-approvalpromptforce.html
    
    // http://stackoverflow.com/questions/8942340/get-refresh-token-google-api
    // access type = offline? doesn't seem to be approval prompt since i'm not using it
    
    // solution? http://stackoverflow.com/questions/21097008/the-app-keeps-asking-for-permission-to-have-offline-access-why
    
    // http://stackoverflow.com/questions/21942290/passport-node-js-not-returning-refresh-token
    // accessType (capital T, NO UNDERSCORE), approvalPrompt (no underscore, capital P) ... DIDNT WORK
    
    
    // http://stackoverflow.com/questions/30637984/what-does-offline-access-in-oauth-mean
    // localhost issue?
    
    // http://stackoverflow.com/questions/34666105/google-oauth2-asking-for-offline-access
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'], accessType: 'offline', approvalPrompt: 'auto' }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
                successRedirect : '/quiz',
                failureRedirect : '/'
    }));
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}