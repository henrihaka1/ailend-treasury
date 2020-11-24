// Angular
import { Component, ChangeDetectionStrategy ,ViewChild, ElementRef, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { DataService } from './data.service';

@Component({
	selector: 'kt-mail',
	templateUrl: './mail.component.html',
	styleUrls:['./mail.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailComponent implements OnInit {

	subs:Subscription[] = [];
	balanceLabels: string[] = [];
	balanceDatasets = [];
	all = [];
	eur = [];
	usd = [];
	gdp = [];
	chf = [];
	aud = [];
	sgd = [];
	cad = [];
	todayBalance = [];
	todayLabels = [];
	t_all = [];
	t_eur = [];
	t_usd = [];
	t_gdp = [];
	t_chf = [];
	t_aud = [];
	t_sgd = [];
	t_cad = [];

	constructor(private data: DataService){}

	// @ViewChild("canvas", {static : true}) element : ElementRef;
	// @ViewChild("today", {static : true}) el : ElementRef;

	ngOnInit()
	{
		//this.getBalances();
		//this.getTodayBalance();
	}

	// createChart()
	// {
		// new Chart(this.element.nativeElement, {
		// 	type : 'line',
		// 	data:{
		// 		labels: this.balanceLabels,
		// 		datasets: [
		// 			{
		// 				label:'ALL',
		// 				data:this.all,
		// 				borderColor: '#00AEFF',
		// 				fill:false,
		// 			},
		// 			{
		// 				label:'EUR',
		// 				data:this.eur,
		// 				borderColor: '#FFCC00',
		// 				fill:false,
		// 			},
		// 			{
		// 				label:'USD',
		// 				data:this.usd,
		// 				borderColor: '#00008B',
		// 				fill:false,
		// 			},
		// 			{
		// 				label:'GDP',
		// 				data:this.gdp,
		// 				borderColor: '#3BFF08',
		// 				fill:false,
		// 			},
		// 			{
		// 				label:'CHF',
		// 				data:this.chf,
		// 				borderColor: '#FF4B00',
		// 				fill:false,
		// 			},
		// 			{
		// 				label:'AUD',
		// 				data:this.aud,
		// 				borderColor: '#FF00F6',
		// 				fill:false,
		// 			},
		// 			{
		// 				label:'SGD',
		// 				data:this.sgd,
		// 				borderColor: '#413D6A',
		// 				fill:false,
		// 			},
		// 			{
		// 				label:'CAD',
		// 				data:this.cad,
		// 				borderColor: '#06FBFF',
		// 				fill:false,
		// 			}
		// 		]
		// 	}
		// });

	// 	new Chart(this.el.nativeElement, {
	// 		type : 'bar',
	// 		data:{
	// 			labels: this.balanceLabels,
	// 			datasets: [
	// 				{
	// 					label:'ALL',
	// 					data:this.all,
	// 					borderColor: '#00AEFF',
	// 					backgroundColor:'#00AEFF',
	// 					fill:false,
	// 				},
	// 				{
	// 					label:'EUR',
	// 					data:this.eur,
	// 					borderColor: '#FFCC00',
	// 					backgroundColor:'#FFCC00',
	// 					fill:false,
	// 				},
	// 				{
	// 					label:'USD',
	// 					data:this.usd,
	// 					borderColor: '#00008B',
	// 					backgroundColor:'#00008B',
	// 					fill:false,
	// 				},
	// 				{
	// 					label:'GDP',
	// 					data:this.gdp,
	// 					borderColor: '#3BFF08',
	// 					backgroundColor:'#3BFF08',
	// 					fill:false,
	// 				},
	// 				{
	// 					label:'CHF',
	// 					data:this.chf,
	// 					borderColor: '#FF4B00',
	// 					backgroundColor:'#FF4B00',
	// 					fill:false,
	// 				},
	// 				{
	// 					label:'AUD',
	// 					data:this.aud,
	// 					borderColor: '#FF00F6',
	// 					backgroundColor:'FF00F6',
	// 					fill:false,
	// 				},
	// 				{
	// 					label:'SGD',
	// 					data:this.sgd,
	// 					borderColor: '#413D6A',
	// 					backgroundColor:'#413D6A',
	// 					fill:false,
	// 				},
	// 				{
	// 					label:'CAD',
	// 					data:this.cad,
	// 					borderColor: '#06FBFF',
	// 					backgroundColor:'#06FBFF',
	// 					fill:false,
	// 				}
	// 			]
	// 		}
	// 	});
	// }

	// getBalances(){
	// 	this.subs.push(this.data.getBalances().subscribe(response =>{
	// 		response.forEach(element =>{

	// 			var date = new Date(element.submitedDate);
	// 			this.balanceLabels.push(date.getDay() +'/' + date.getMonth());
	// 			this.balanceDatasets.push(JSON.parse(element.balance));
	// 		})
	// 		this.createDatasets();
	// 	}));
	// }

	// getTodayBalance(){
	// 	this.subs.push(this.data.getTodayBalances().subscribe(response =>{
	// 		response.forEach(element => {
	// 			var date = new Date(element.submitedDate);
	// 			this.todayLabels.push(date.getMinutes() + date.getHours());
	// 			this.todayBalance.push(JSON.parse(element.balance));
	// 		})
	// 		this.createTodayDataset();
	// 	}));
	// }

	ngOnDestroy()
	{
		//this.subs.forEach(element => element.unsubscribe());
	}

	// createTodayChart(){
	// 	new Chart(this.element.nativeElement, {
	// 		type : 'line',
	// 		data:{
	// 			labels: this.todayLabels,
	// 			datasets: [
	// 				{
	// 					label:'ALL',
	// 					data:this.t_all,
	// 					borderColor: '#00AEFF',
	// 					fill:false,
	// 				},
	// 				{
	// 					label:'EUR',
	// 					data:this.t_eur,
	// 					borderColor: '#FFCC00',
	// 					fill:false,
	// 				},
	// 				{
	// 					label:'USD',
	// 					data:this.t_usd,
	// 					borderColor: '#00008B',
	// 					fill:false,
	// 				},
	// 				{
	// 					label:'GDP',
	// 					data:this.t_gdp,
	// 					borderColor: '#3BFF08',
	// 					fill:false,
	// 				},
	// 				{
	// 					label:'CHF',
	// 					data:this.t_chf,
	// 					borderColor: '#FF4B00',
	// 					fill:false,
	// 				},
	// 				{
	// 					label:'AUD',
	// 					data:this.t_aud,
	// 					borderColor: '#FF00F6',
	// 					fill:false,
	// 				},
	// 				{
	// 					label:'SGD',
	// 					data:this.t_sgd,
	// 					borderColor: '#413D6A',
	// 					fill:false,
	// 				},
	// 				{
	// 					label:'CAD',
	// 					data:this.t_cad,
	// 					borderColor: '#06FBFF',
	// 					fill:false,
	// 				}
	// 			]
	// 		}
	// 	});
	// }

	// createTodayDataset(){
	// 	this.todayBalance.forEach(data =>{
	// 		if(data.label=="ALL")
	// 				this.t_all.push(data.amount.toFixed(2))
	// 			if(data.label=="EUR")
	// 				this.t_eur.push(data.amount.toFixed(2))
	// 			if(data.label=="USD")
	// 				this.t_usd.push(data.amount.toFixed(2))
	// 			if(data.label=="GDP")
	// 				this.t_gdp.push(data.amount.toFixed(2))
	// 			if(data.label=="CHF")
	// 				this.t_chf.push(data.amount.toFixed(2))
	// 			if(data.label=="AUD")
	// 				this.t_aud.push(data.amount.toFixed(2))
	// 			if(data.label=="SGD")
	// 				this.t_sgd.push(data.amount.toFixed(2))
	// 			if(data.label=="CAD")
	// 				this.t_cad.push(data.amount.toFixed(2))
	// 	})
	// 	this.createTodayChart();
	// }

	// createDatasets(){
	// 	this.balanceDatasets.forEach(data => {
	// 		data.forEach(element=>{
	// 			if(element.label=="ALL")
	// 				this.all.push(element.amount.toFixed(2))
	// 			if(element.label=="EUR")
	// 				this.eur.push(element.amount.toFixed(2))
	// 			if(element.label=="USD")
	// 				this.usd.push(element.amount.toFixed(2))
	// 			if(element.label=="GDP")
	// 				this.gdp.push(element.amount.toFixed(2))
	// 			if(element.label=="CHF")
	// 				this.chf.push(element.amount.toFixed(2))
	// 			if(element.label=="AUD")
	// 				this.aud.push(element.amount.toFixed(2))
	// 			if(element.label=="SGD")
	// 				this.sgd.push(element.amount.toFixed(2))
	// 			if(element.label=="CAD")
	// 				this.cad.push(element.amount.toFixed(2))
	// 		})
	// 	});
	// 	this.createChart();
	// }

	
	formatNumber(x) {
		if(x === undefined)
		  return
		var parts = x.toString().split(".");
		parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
		return parts.join(",");
	  }
	
	
}

