/**
 * [VueJs Events Add Tool]
 * Author: yuuk
 * Date:2016-09-05
 */
new Vue({
	el : "#app",
	data: {
		event : {
			name: '',
			desc: '',
			date: ''
		},
		events: []
	},
	ready: function(){
		//读取localStorage
		if(localStorage.events){
			var eventsArr = JSON.parse(localStorage.events);
			this.events = eventsArr;
		}
	},
	methods: {
		addEvent: function(){				
			//编辑
			if(this.event.id !== undefined){
				var index = this.event.id;
				this.events[index]['name'] = this.event.name;
				this.events[index]['desc'] = this.event.desc;
				this.events[index]['date'] = this.event.date;
			}
			//添加
			else{					
				if(this.event.name){						
					//不能添加重复的事件名称
					for(var i=0;i<this.events.length;i++){
						if(this.events[i].name==this.event.name){
							alert('事件名称不能重复哦~');
							return;
						}
					}
					//添加数据到列表
					this.events.push(this.event);
				}
				else{
					alert('请填写事件名称！');
				}
			}

			//存储localStorage
			localStorage.events = JSON.stringify(this.events);

			console.log();

			//清空数据
			this.event = {name: '',desc: '',date: ''}
		},
		editEvent: function(index){
			this.event = {
				name: this.events[index].name,
				desc: this.events[index].desc,
				date: this.events[index].date,
				id: index
			}
		},
		delEvent: function(index){
			if(confirm("确定要删除吗?")) {
				this.events.splice(index,1);        
				}
				//对应删除localStorage中的数据
				if(localStorage.events){
				var eventsArr = JSON.parse(localStorage.events);
				eventsArr.splice(index,1);
				localStorage.events = JSON.stringify(eventsArr);
			}				
		}
	}
});