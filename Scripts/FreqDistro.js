let database = [];
let processedData = [];
let vls = []

function CutOffAtPoint(x, place){
    return parseFloat(x.toFixed(place));
}

function AddToDatabase(){
    database.push(document.getElementById('val').value);
    document.getElementById('database').innerHTML = database;
    document.getElementById('val').value = null;
    console.log(database);
}

function ResetDatabase(){
    database=[];
    document.getElementById('val').value = null;
}

function GetOutputData(data){
    if(data === undefined || data.length == 0){
        console.log('Error, no value in database');
        return 1;
    }

    for(i=0; i < data.length; i++){
        if(data[i] == undefined || data[i]==""){
            data.splice(i, 1);
        }
    }

    database=[];
    document.getElementById('database').innerHTML = database;
    rangeValue = Math.max.apply(null, data) - Math.min.apply(null, data);
    intervalAmount = Math.round(1 + (3.3 * Math.log10(data.length)));
    intervalSize = Math.round(rangeValue / intervalAmount);
    vls = [rangeValue, intervalAmount, intervalSize];

    freq=[];        //Frequency
    relFreq=[]      //Relative Frequency
    upperLimit=[];  //Upper Limit
    lowerLimit=[];  //Lower Limit
    cm=[];          //Class Mark
    cb=[];          //Class Border
    intervals=[];   //Intervals
    gcf=[];         //>CF
    lcf=[];         //<CF

    console.log(rangeValue);
    console.log(intervalAmount);
    console.log(intervalSize);
    
    for(i=0; i < intervalAmount; i++){
        freq[i] = 0;
        cm[i] = 0;
        relFreq[i] = 0;
        gcf[i] =0;
        lcf[i] =0;
    }

    //Get Intervals and Class Border
    lower=Math.min.apply(null, data);
    for(i=0; i < intervalAmount; i++){
        var upper=lower+intervalSize;
        var lowerExact = lower - 0.5;
        var upperExact = upper + 0.5;

        intervals.push(lower + ' - ' + upper);
        cb.push(lowerExact + ' - ' + upperExact);
        upperLimit.push(upper);
        lowerLimit.push(lower);
        lower=upper+1;
    }

    //Getting the frequency
    for(i=0; i < data.length; i++){
        for(z=0; z < upperLimit.length; z++){
            if(data[i] <= upperLimit[z] && data[i] >= lowerLimit[z]){
                freq[z] += 1;
            }
        }
    }

    //Getting the relative frequency
    for (i=0; i<freq.length; i++){
        relFreq[i]=CutOffAtPoint((freq[i]/data.length)*100, 2);
    }

    //Getting the Class Mark
    for(i=0; i<upperLimit.length;i++){
        cm[i]=(upperLimit[i]+lowerLimit[i])/2;
    }

    //Getting the >CF
    lastv=0;
    for(i=0; i<freq.length; i++){
        gcf[i]=freq[i]+lastv;
        lastv=freq[i]+lastv;
    }

    //Getting the <CF
    freqR = freq.slice(0);

    freqR.reverse();
    lastv=0;
    for(i=0; i<freqR.length; i++){
        lcf[i]=freqR[i]+lastv;
        lastv=freqR[i]+lastv;
    }
    lcf.reverse();

    /*
    console.log(intervals)
    console.log('Freq: ' + freq);
    console.log('FreqR: ' + freqR );
    console.log('GCF: ' + gcf);
    console.log('LCF: ' + lcf);
    console.log('CM: ' + cm);
    console.log('CB: ' + cb);
    */

    processedData = [intervals, freq, cm, relFreq, cb, gcf, lcf];
    DisplayData();
}

function DisplayData(){
    document.getElementById('frequencyTable').innerHTML = "";
    valTable = document.getElementById("valueTable");
    processedDataTable = document.getElementById("frequencyTable");

    results.style.display="block";

    for(i=0; i < valTable.rows.length; i++){
        valTable.rows[i].cells[1].innerHTML = vls[i];
    }

    for(i=0; i < processedData[0].length; i++){
        processedDataTable.insertRow(0);
    }

    for(i=0; i < processedDataTable.rows.length; i++){
        processedDataTable.rows[i].insertCell(0);
        processedDataTable.rows[i].insertCell(0);
        processedDataTable.rows[i].insertCell(0);
        processedDataTable.rows[i].insertCell(0);
        processedDataTable.rows[i].insertCell(0);
        processedDataTable.rows[i].insertCell(0);
        processedDataTable.rows[i].insertCell(0);
    }
    for(outer=0; outer < processedDataTable.rows.length; outer++){
        for(inner=0; inner < 7; inner++){
                processedDataTable.rows[outer].cells[inner].innerHTML = processedData[inner][outer];
        }
    }
}
