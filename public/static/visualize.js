var ArrayGenerator = document.getElementById("ArrGenBtn");
var BubleButton = document.getElementById("BubleSort");
var selectionSortButton = document.getElementById("SelectionSort");
var mergeSortButton = document.getElementById("MergeSort");
var quickSortButton = document.getElementById("QuickSort");
var heapSortButton = document.getElementById("HeapSort");
var waitTimeInput = document.getElementById("waitTime");
var sampleInput = document.getElementById("sampleNumberInput");
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var newArr = [];
var waitTime = 10;
var ColWidth = 20;
var sampleNumber = 50;

function sleep() {
 	return new Promise(resolve => setTimeout(resolve, waitTime));
}

function submitWaitTimeClick(){
	waitTimeInput.addEventListener("change", function(){
		waitTime = waitTimeInput.value;
		document.getElementById("currentWaitTime").textContent = waitTime;
	});
}

function disableButtons(){
	ArrGenBtn.disabled = true;
	BubleButton.disabled = true;
	selectionSortButton.disabled = true;
	mergeSortButton.disabled = true;
	quickSortButton.disabled = true;
	heapSortButton.disabled = true;
	waitTimeInput.disabled = true;
	sampleNumberInput.disabled = true;
}
function enableButtons(){
	ArrGenBtn.disabled = false;
	BubleButton.disabled = false;
	selectionSortButton.disabled = false;
	mergeSortButton.disabled = false;
	quickSortButton.disabled = false;
	heapSortButton.disabled = false;
	waitTimeInput.disabled = false;
	sampleNumberInput.disabled = false;
}

function submitSampleClick(){
	sampleInput.addEventListener("change", function(){
		sampleNumber = sampleInput.value;
		document.getElementById("currentSample").textContent = sampleNumber;
		ColWidth = Math.round(1000/sampleNumber);
		arrGen();
	})
}


function paint(canvas, context,color, x, y, w, h, thickness){
	context.clearRect(x, y, w, canvas.height);
	context.fillStyle = "#FFF";
	context.fillRect(x , y, w, h);
	context.fillStyle = color;
	context.fillRect(x + thickness , y, w - 2*thickness , h - 2*thickness);
}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function arrGenClick(){
	ArrayGenerator.addEventListener("click", arrGen);
}

function arrGen(){
	newArr = [];
	for (var i=0;i<sampleNumber;i++){
		newArr.push(5*i);
	}
	newArr = shuffle(newArr);
	// render array
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (var i=0;i<sampleNumber;i++){
		// draw lines
		paint(canvas, context,"#808080", 10 + ColWidth*i, 0, ColWidth, newArr[i], 1);
	}
}

function bubleSort(){
	BubleButton.addEventListener("click", async function(){
		disableButtons();
		for(var i = 0; i < newArr.length; i++){
			for (var j = 0; j < newArr.length - i; j++){
				// paint the current col in red
				paint(canvas, context, "#FF0000", 10 + ColWidth*j, 0, ColWidth, newArr[j], 1);
				await sleep(100);
				if (newArr[j] > newArr[j+1]){
					var temp = newArr[j];
					newArr[j] = newArr[j+1];
					newArr[j+1] = temp;
				}
				// paint the current col with gray
				paint(canvas, context, "#808080", 10 + ColWidth*j, 0, ColWidth, newArr[j], 1);
			}
			// paint the sorted column in green
			paint(canvas, context, "#008000",10 + ColWidth*(newArr.length - i-1), 0, ColWidth, newArr[newArr.length - i-1], 1);
		}
		enableButtons();
	});
}

function selectionSort(){
	selectionSortButton.addEventListener("click", async function(){
		console.log(newArr);
		disableButtons();
		// loop through array
		for (var i = 0; i < newArr.length; i++){
			var min_idx = i;
			// paint current min element in blue to track it
			paint(canvas, context, "#0000FF", 10 + ColWidth*min_idx, 0, ColWidth, newArr[min_idx], 1);
			for (var j = i+1; j < newArr.length+1; j++){
				// illustrate j step by turning to red
				// we dont want to gray out the current min element so we put condition here
				if (j-1 !== min_idx){
					// grey out previous column
					paint(canvas, context, "#808080", 10 + ColWidth*(j-1), 0, ColWidth, newArr[j-1], 1);	
				}
				// paint current j column in red
				paint(canvas, context, "#FF0000", 10 + ColWidth*j, 0, ColWidth, newArr[j], 1);
				await sleep(50);
				// find new min element and turn to blue
				if(newArr[min_idx] > newArr[j]){
					paint(canvas, context, "#808080", 10 + ColWidth*min_idx, 0, ColWidth, newArr[min_idx], 1);
					min_idx = j;
					paint(canvas, context, "#0000FF", 10 + ColWidth*min_idx, 0, ColWidth, newArr[min_idx], 1);
				}
				await sleep(50);
			}
			// swap min element to the begining of the array
			if(min_idx !== i){
				var temp = newArr[i];
				newArr[i] = newArr[min_idx];
				newArr[min_idx] = temp;
				paint(canvas, context, "#008000", 10 + ColWidth*i, 0, ColWidth, newArr[i], 1);
				paint(canvas, context, "#808080", 10 + ColWidth*min_idx, 0, ColWidth, newArr[min_idx], 1);
			} else{
				// if min element is in correct position, means min_idx == i
				// no swap, only paint it to green
				paint(canvas, context, "#008000", 10 + ColWidth*i, 0, ColWidth, newArr[i], 1);	
			}
		}
		enableButtons();
		console.log(newArr);
	});
}

function mergeSortBtnClick(){
	mergeSortButton.addEventListener("click", async function(){
		disableButtons();
		await mergeSort(newArr, 0);
		enableButtons();
		console.log(newArr);
	});
}

async function mergeSort(arr, start){
	if(arr.length > 1){
		var mid = Math.round(arr.length / 2);
		var L = arr.slice(0, mid);
		var R = arr.slice(mid, arr.length);
		// sort 2 halves
		await mergeSort(L, start);
		await mergeSort(R, start + mid);
		// logic to sort
		// use 2 index, 1 for L, 1 for R. which one is lesser then add that one to arr and increase index
		var i = j = k = 0;
		while (i < L.length && j < R.length){
			if (L[i] < R[j]){
				arr[k] = L[i];
				i++;
			} else{
				arr[k] = R[j];
				j++;
			}
			paint(canvas, context, "#008000", 10 + ColWidth*(start+k), 0, ColWidth, arr[k], 1);
			// after adding, increase index of arr by 1
			k++;
			await sleep();
		}
		
		// handle all elements that are left
		while (i < L.length){
			arr[k] = L[i];
			paint(canvas, context, "#008000", 10 + ColWidth*(start+k), 0, ColWidth, arr[k], 1);
			// await sleep(50);
			i++;
			k++;
			await sleep();
		}
		while(j < R.length){
			arr[k] = R[j];
			paint(canvas, context, "#008000", 10 + ColWidth*(start+k), 0, ColWidth, arr[k], 1);
			j++;
			k++;
			await sleep();
		}
	}
}

function quickSortClick(){
	quickSortButton.addEventListener("click", async function(){
		console.log(newArr);
		disableButtons();
		await quickSort(newArr, 0, newArr.length-1);
		enableButtons();
		console.log(newArr);
	});
}

async function quickSort(arr, low, high){
	if(low < high){
		var pi = await partition(arr, low, high);
		await quickSort(arr, low, pi-1);
		await quickSort(arr, pi+1, high);
	}
}

async function partition(arr, low, high){

	var pivot = arr[high];
	// highlight pivot element
	paint(canvas, context, "blue", 10 + ColWidth*(high), 0, ColWidth, newArr[high], 1);	
	var k = low-1;
	for(var i = low; i < high; i++){
		// illustrate running cursor
		if(arr[i-1] == 5*(i-1)){
			paint(canvas, context, "green", 10 + ColWidth*(i-1), 0, ColWidth, newArr[i-1], 1);		
		} else{
			paint(canvas, context, "grey", 10 + ColWidth*(i-1), 0, ColWidth, newArr[i-1], 1);		
		}
		if(arr[i] == 5*i){
			paint(canvas, context, "green", 10 + ColWidth*i, 0, ColWidth, newArr[i], 1);	
		} else{
			paint(canvas, context, "red", 10 + ColWidth*i, 0, ColWidth, newArr[i], 1);			
		}
		await sleep();
		if(arr[i] < pivot){
			k++;
			[arr[k], arr[i]] = [arr[i], arr[k]];
		}
		paint(canvas, context, "grey", 10 + ColWidth*i, 0, ColWidth, newArr[i], 1);
		if(arr[k] == 5*k){
			paint(canvas, context, "green", 10 + ColWidth*k, 0, ColWidth, newArr[k], 1);	
		} else{
			paint(canvas, context, "grey", 10 + ColWidth*k, 0, ColWidth, newArr[k], 1);	
		}
	}
	[arr[k+1], arr[high]] = [arr[high], arr[k+1]];
	// paint the correct element in green
	paint(canvas, context, "green", 10 + ColWidth*(k+1), 0, ColWidth, arr[k+1], 1);
	if(arr[high] == 5*high){
		paint(canvas, context, "green", 10 + ColWidth*(high), 0, ColWidth, newArr[high], 1);		
	} else{
		paint(canvas, context, "grey", 10 + ColWidth*(high), 0, ColWidth, newArr[high], 1);	
	}
	
	return k+1;
}


function heapSortBtnClick(){
	heapSortButton.addEventListener("click", async function(){
		console.log(newArr);
		disableButtons();
		await heapSort(newArr);
		enableButtons();
		console.log(newArr);	
	})
}

async function heapSort(arr){
	// build maxheap
	for (var i = Math.round(arr.length/2)-1;i > -1; i--){
		await heapify(arr, arr.length, i);
	}
	// sort arr by swapping greatest element (arrp[0]) to the end of array
	// then heapify again at the top to build maxheap
	for (var i = arr.length-1; i > -1; i--){
		[arr[i],arr[0]]=[arr[0],arr[i]];
		paint(canvas, context, "green", 10 + ColWidth*(i), 0, ColWidth, arr[i], 1);
		paint(canvas, context, "blue", 10 + ColWidth*(0), 0, ColWidth, arr[0], 1);	
		await heapify(arr, i, 0);
	}
}

async function heapify(arr, n, i){
	var greatest = i;
	var L = 2*i + 1;
	var R = 2*i + 2;
	if(L < n && arr[greatest] < arr[L]){
		greatest = L;
	}
	if(R < n && arr[greatest] < arr[R]){
		greatest = R;
	}
	if(greatest !== i){
		[arr[i], arr[greatest]] = [arr[greatest], arr[i]];
		paint(canvas, context, "blue", 10 + ColWidth*(greatest), 0, ColWidth, arr[greatest], 1);
		paint(canvas, context, "blue", 10 + ColWidth*(i), 0, ColWidth, arr[i], 1);
		await sleep();
		await heapify(arr, n, greatest);
	}
	if(arr[i] !== 5*i){
		paint(canvas, context, "blue", 10 + ColWidth*(i), 0, ColWidth, arr[i], 1);
	}
	if(arr[L] !== 5*L){
		paint(canvas, context, "blue", 10 + ColWidth*(L), 0, ColWidth, arr[L], 1);
	}
	if(arr[R] !== 5*R){
		paint(canvas, context, "blue", 10 + ColWidth*(R), 0, ColWidth, arr[R], 1);
	}
}

function init(){
	arrGenClick();
	bubleSort();
	selectionSort();
	mergeSortBtnClick();
	quickSortClick();
	heapSortBtnClick();
	submitWaitTimeClick();
	submitSampleClick();
};

init();