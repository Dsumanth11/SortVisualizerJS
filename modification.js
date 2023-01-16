let size_element=document.getElementById("sizeofArray");
size_element.addEventListener('input',(event)=>{
    let size_value=event.target.value;
    n=size_value;
    localStorage.setItem('n',JSON.stringify(n));
    location.reload();
});
size_element.value=n;

let speedofArray=document.getElementById("speedofArray");
speedofArray.addEventListener('input',(event)=>{
    let temp_speed=Math.abs(event.target.value);
    frameCountDefault=temp_speed;
    localStorage.setItem('frameCountDefault',JSON.stringify(frameCountDefault));
});

document.getElementById("ASC").addEventListener('change',()=>{
    array_sorting_order=document.getElementById("ASC").checked;
    localStorage.setItem("array_sorting_order",JSON.stringify(array_sorting_order));
});
document.getElementById("DESC").addEventListener('change',()=>{
    array_sorting_order=document.getElementById("ASC").checked;
    localStorage.setItem("array_sorting_order",JSON.stringify(array_sorting_order));
});
let BubbleSortMessage="Bubble Sort Visualizer";
let InsertionSortMessage="Insertion Sort Visualizer";
let SelectionSortMessage="Selection Sort Visualizer";
document.getElementById("bubbleSort").addEventListener('click',function(){
    if(is_array_sorted===false)
    {
        default_sort_option=1;
        document.getElementById("bubbleSort").classList.remove("btn-outline-info");
        document.getElementById("bubbleSort").classList.add("btn-info");
        document.getElementById("insertionSort").classList.add("btn-outline-warning");
        document.getElementById("insertionSort").classList.remove("btn-warning");
        document.getElementById("selectionSort").classList.add("btn-outline-primary");
        document.getElementById("selectionSort").classList.remove("btn-primary");
        document.getElementById("SortAlgoHeading").textContent=BubbleSortMessage;
        localStorage.setItem("DefaultSortOption",JSON.stringify(default_sort_option));
    }
    else
    {
        alert("Can't Change Sorting Algorithm After Starting\nPlease try again with Generating new array");
    }
});
document.getElementById("insertionSort").addEventListener('click',function(){
    if(is_array_sorted===false)
    {
        default_sort_option=2;
        document.getElementById("insertionSort").classList.remove("btn-outline-warning");
        document.getElementById("insertionSort").classList.add("btn-warning");
        document.getElementById("bubbleSort").classList.add("btn-outline-info");
        document.getElementById("bubbleSort").classList.remove("btn-info");
        document.getElementById("selectionSort").classList.add("btn-outline-primary");
        document.getElementById("selectionSort").classList.remove("btn-primary");
        document.getElementById("SortAlgoHeading").textContent=InsertionSortMessage;
        localStorage.setItem("DefaultSortOption",JSON.stringify(default_sort_option));
    }
    else
    {
        alert("Can't Change Sorting Algorithm After Starting\nPlease try again with Generating new array");
    }
});
document.getElementById("selectionSort").addEventListener('click',function(){
    if(is_array_sorted===false)
    {
        default_sort_option=3;
        document.getElementById("selectionSort").classList.remove("btn-outline-primary");
        document.getElementById("selectionSort").classList.add("btn-primary");
        document.getElementById("insertionSort").classList.add("btn-outline-warning");
        document.getElementById("insertionSort").classList.remove("btn-warning");
        document.getElementById("bubbleSort").classList.add("btn-outline-info");
        document.getElementById("bubbleSort").classList.remove("btn-info");
        document.getElementById("SortAlgoHeading").textContent=SelectionSortMessage;
        localStorage.setItem("DefaultSortOption",JSON.stringify(default_sort_option));
    }
    else
    {
        alert("Can't Change Sorting Algorithm After Starting\nPlease try again with Generating new array");
    }
});
// switch used for initialising the default values at the start or reload from the local Storage
switch(default_sort_option)
{
    case 1:
        // below are used for setting default button bubble sort and insertion sort initial values
        document.getElementById("bubbleSort").classList.remove("btn-outline-info");
        document.getElementById("bubbleSort").classList.add("btn-info");
        // document.getElementById("insertionSort").classList.add("btn-outline-warning");
        // document.getElementById("insertionSort").classList.remove("btn-warning");
        // below is used for setting default Bubble sort message
        document.getElementById("SortAlgoHeading").textContent=BubbleSortMessage;
        break;
    case 2:
        // below are used for setting default button bubble sort and insertion sort initial values
        document.getElementById("insertionSort").classList.remove("btn-outline-warning");
        document.getElementById("insertionSort").classList.add("btn-warning");
        // document.getElementById("bubbleSort").classList.add("btn-outline-info");
        // document.getElementById("bubbleSort").classList.remove("btn-info");
        // below is used for setting default Insertion sort message
        document.getElementById("SortAlgoHeading").textContent=InsertionSortMessage;
        break;
    case 3:
        document.getElementById("selectionSort").classList.remove("btn-outline-primary");
        document.getElementById("selectionSort").classList.add("btn-primary");
        document.getElementById("SortAlgoHeading").textContent=SelectionSortMessage;
        break;
}