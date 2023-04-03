import { Component, OnInit } from '@angular/core';
import * as XLSX from "xlsx";
import { NavigationExtras, Router } from "@angular/router";
import { DxChartModule, DxSelectBoxModule } from 'devextreme-angular';
import { distinct } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  file: any;
  excelData: any;
  beforeFileUpload: boolean = true;
  // distinctFunctions:any;

  distinctFunctions: any = [];
  emissionInfo: any = [];
  cpuPowerInfo: any = [];
  executionDurationInfo: any = [];

  masterData: any = [];
  noOfGraphs: number = 0;
  emissionMasterDataSource: any = [];
  energyConsumedDataSource:any = [];
  unique: any;
  avgDataPoints:any=[];
  cpuEnergyPCData:any=[];
  ramEnergyPCData:any=[];
  timeExecPCData:any=[];


  // functions = [
  //   {name:'unoptimized_fibonacci', value:'unoptimized_fibonacci'},
  //   {name:'optimized_fibonacci', value:'optimized_fibonacci'}
  // ]
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    // this.file = event.target.files
    // console.log(event)

    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length > 1) {
      alert('Multiple files are not allowed');
      return;
    }
    else {
      this.file = event.target.files
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        let data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
        // Print the Excel Data
        console.log(data);
        this.excelData = data;
      }
      reader.readAsBinaryString(target.files[0]);
    }
  }

  onFileupload() {
    console.log(this.file);
    this.beforeFileUpload = false;
    this.excelData = this.excelData.slice(1);
    console.log(this.excelData)
    this.cleanData(this.excelData);
    // this.cleanDataCompareGraph(this.excelData);

  }


  cleanData(excelData: any) {
    this.unique = [...new Set(excelData.map((item: any[]) => item[2]))]
    this.noOfGraphs = this.unique.length;

    for (let i = 0; i < this.unique.length; i++) {
      const result: unknown[][] = [];
      excelData.forEach((element: unknown[]) => {
        if (element[2] == this.unique[i])
          result.push(element);
      });
      this.masterData.push(result);
    }
    console.log(this.masterData);

    for (let data of this.masterData) {
      console.log('data', data);
      const prepEmissionData = [];
      const prepEnergyConsumedData = [];
      let CPUEnergy = 0;
      let RAMEenergy = 0;
      let timeExecution = 0;
      for (let i = 0; i < data.length; i++) {
        const x = {
          args: data[i][18],
          value: data[i][5]
        }
        const y = {
          args: data[i][18],
          value: data[i][9]
        }
        prepEmissionData.push(x);
        prepEnergyConsumedData.push(y)
        CPUEnergy = CPUEnergy + data[i][9];
        RAMEenergy = RAMEenergy + data[i][10];
        timeExecution = timeExecution + data[i][4];
      }

      this.emissionMasterDataSource.push(prepEmissionData);
      this.energyConsumedDataSource.push(prepEnergyConsumedData);
      this.avgDataPoints.push([
        {'cpuEnergy': CPUEnergy/data.length},
        {'ramEnergy': RAMEenergy/data.length},
        {'timeExecution': timeExecution/data.length}
      ])
      this.cpuEnergyPCData.push({function:data[0][2], value:CPUEnergy/data.length});
      this.ramEnergyPCData.push({function:data[0][2], value:RAMEenergy/data.length});
      this.timeExecPCData.push({function:data[0][2], value:timeExecution/data.length});
    }

    console.log('EmissionDataSource', this.emissionMasterDataSource)
    console.log('avgDataPoints', this.avgDataPoints);
    console.log('this.cpuEnergyPCData',this.cpuEnergyPCData)


  }

  // cleanDataCompareGraph(excelData:any){
  //   const unique = [...new Set(excelData.map((item: any[]) => item[2]))]
  //   console.log('uniqye', unique)
  //   for(let i=0;i < unique.length;i++){
  //     const funct = {name:unique[i], value:unique[i]}
  //     this.distinctFunctions.push(funct);
  //   }

  //   console.log('Distinct Functions', this.distinctFunctions)

  //   for(let i=0; i< excelData.length;i=i+2){
  //     const prepEmissionData = {
  //       args:excelData[i][18],
  //       optimized_fibonacci:excelData[i][5],
  //       unoptimized_fibonacci:excelData[i+1][5]
  //     }
  //     console.log('prepEmissionData',prepEmissionData)
  //     this.emissionInfo.push(prepEmissionData);
  //   }

  //   for(let i=0; i< excelData.length;i=i+2){
  //     const prepDurationData = {
  //       args:excelData[i][18],
  //       optimized_fibonacci:excelData[i][4],
  //       unoptimized_fibonacci:excelData[i+1][4]
  //     }
  //     this.executionDurationInfo.push(prepDurationData);
  //   }

  // }

}
