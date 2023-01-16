let n =10;
// Used for alerting after sorted array if user presses again sort button
let is_array_sorted=false;
let default_sort_option=1;
// used for identifying ascending order or descending order 
// true ascending order by default;
let array_sorting_order=true;
if(localStorage.getItem("DefaultSortOption")!==null)
{
    default_sort_option=JSON.parse(localStorage.getItem("DefaultSortOption"));
}
// Checking whether the local storage contains string or not
// If not present assigning default to Ascending Order
if(localStorage.getItem("array_sorting_order")!==null)
{
    array_sorting_order=JSON.parse(localStorage.getItem("array_sorting_order"));
}
// changing the radio button based on the local storage Data
if(array_sorting_order===false)
{
    document.getElementById("DESC").checked=true;
}

// This is used to check whether user has fixed any size of array previously or not
//  if in Prior if the used fixed the value of array then using that value
if(localStorage.getItem('n')!==null)
{
    n=JSON.parse(localStorage.getItem('n'));
}
// if previously item is not set then we are default set it to 10
localStorage.setItem('n',JSON.stringify(n));
const array = [];

// used another array because after applying bubble sort the first get sorted ]
// while applying swap operation we need this another array
let temp_array=[];
const myCanvas = document.getElementById("myCanvas");
myCanvas.width =300;
myCanvas.height =320;
// To Store the swapping moves and not swapping moves
// animation are done on this array using one by one    
let moves_required_to_sort_array=[];
const margin=30;
const cols = [];
let no_of_swaps_done=0;
// space for each element of the canvas
// width for each item= total width/no of elements
const spacing = (myCanvas.width-margin*2) / n;
// creating canvas object for drawing
const ctx = myCanvas.getContext("2d");
let button_clicked_or_not=false;
const max_col_height=200;
function Restart_Function()
{
    is_array_sorted=false;
    button_clicked_or_not=false;
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
    for(let i = 0; i < n; i++) 
    {
        array[i] = Math.random() + 0.1;
    }
    temp_array=array;
    generation_of_bars();
    animateSorting();
    // // if button start sorting is clicked below function executes
    let SortingBtn=document.getElementById("SortingBtn");
    SortingBtn.addEventListener('click',function()
    {
        if(is_array_sorted===false)
        {
            no_of_swaps_done=0;
            array_sorting_order=document.getElementById("ASC").checked;
            // console.log(array_sorting_order);   
            SortingBtn.disabled=true;
            button_clicked_or_not=true;
            if(default_sort_option===1)
            {
                moves_required_to_sort_array=bubbleSort(array);
            }
            else if(default_sort_option===2)
            {
                moves_required_to_sort_array=insertionSort(array);
            }
            else if(default_sort_option===3)
            {
                moves_required_to_sort_array=selectionSort(array);
            }
            animateSorting();
            SortingBtn.textContent="Sorting";
        }
        else
        {
            alert("Array Already Sorted ! \nGenerate new array and Try sorting");
        }
    });
}
Restart_Function();
function RandomiseElements()
{
    location.reload();
}
function generation_of_bars()
{
    for (let i = 0; i < array.length; i++) {
        const x = (spacing * i) + (spacing/2)+margin;
        const y = myCanvas.height-margin;
        const width = spacing-5;
        const height = array[i] * (max_col_height);
        // const height = array[i] * (myCanvas.height-margin*2);
        cols[i] = new Column(x, y, width, height,array[i]*max_col_height);

    }
}
function selectionSort(array)
{
    const moves_happened=[];
    if(array_sorting_order)
    {
        for(let i=0;i<array.length;i++)
        {
            let min_index=i;
            for(let j=i+1;j<array.length;j++)
            {
                if(array[j]<array[min_index])
                {
                    min_index=j;
                }
            }
            if(min_index!==i)
            {
                no_of_swaps_done++;
                moves_happened.push({indices:[i,min_index],swap:true});
                [array[i],array[min_index]]=[array[min_index],array[i]];
            }
            else
            {
                moves_happened.push({indices:[i,min_index],swap:false});
            }
        }
    }
    else
    {
        for(let i=array.length-1;i>=0;i--)
        {
            let min_index=i;
            for(let j=i-1;j>=0;j--)
            {
                if(array[j]<array[min_index])
                {
                    min_index=j;
                }
            }
            if(min_index!==i)
            {
                no_of_swaps_done++;
                moves_happened.push({indices:[i,min_index],swap:true});
                [array[i],array[min_index]]=[array[min_index],array[i]];
            }
            else
            {
                moves_happened.push({indices:[i,min_index],swap:false});
            }
        }
    }
    return moves_happened;
}
function insertionSort(array)
{
    const moves_happened=[];
    // insertion sort code
    if(array_sorting_order)
    {
        for(let i=1;i<array.length;i++)
        {
            let j=i-1;
            while(j>=0 && array[j]>array[j+1])
            {
                no_of_swaps_done++;
                moves_happened.push({indices:[j,j+1],swap:true});
                [array[j],array[j+1]]=[array[j+1],array[j]];
                j--;
            }
            if(j>=0)
            {
                moves_happened.push({indices:[j,j+1],swap:false});
            }
        }
    }
    else
    {
        for(let i=array.length-1;i>=0;i--)
        {
            let j=i+1;
            while(j<array.length && array[j]>array[j-1])
            {
                no_of_swaps_done++;
                moves_happened.push({indices:[j,j-1],swap:true});
                [array[j],array[j-1]]=[array[j-1],array[j]];
                j++;
            }
            if(j<array.length)
            {
                moves_happened.push({indices:[j,j-1],swap:false});
            }
        }
    }
    return moves_happened;
}
function bubbleSort(array)
{
    // storing the moves of the swapping elements
    const moves_happened=[];
    do
    {
        var swapped=false;
        for(let i=1;i<array.length;i++)
        {
            if(array_sorting_order)
            {
                if(array[i]<array[i-1])
                {
                    no_of_swaps_done++;
                    swapped=true;
                    moves_happened.push({indices:[i-1,i],swap:true});
                    [array[i],array[i-1]]=[array[i-1],array[i]];
                }
                else
                {
                    moves_happened.push({indices:[i-1,i],swap:false});
                }
            }
            else
            {
                if(array[i]>array[i-1])
                {
                    no_of_swaps_done++;
                    swapped=true;
                    moves_happened.push({indices:[i-1,i],swap:true});
                    [array[i],array[i-1]]=[array[i-1],array[i]];
                }
                else
                {
                    moves_happened.push({indices:[i-1,i],swap:false});
                }
            }
        }
    }while(swapped);
    return moves_happened;
}
function animateSorting()
{
    var isSwapFree=false;
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
    for(let i=0;i<cols.length;i++)
    {
        isSwapFree=cols[i].draw(ctx,temp_array[i]*max_col_height)|| isSwapFree;
    }
    if(isSwapFree===false && moves_required_to_sort_array.length>0)
    {
        is_array_sorted=true;
        const move=moves_required_to_sort_array.shift();
        const [i,j]=move.indices;
        if(move.swap===true)
        {
            cols[i].moveTo(cols[j],1);
            cols[j].moveTo(cols[i],-1);
            [cols[i],cols[j]]=[cols[j],cols[i]];
        }
        else{
            cols[i].jump();
            cols[j].jump();
        }
    }
    if(button_clicked_or_not)
    requestAnimationFrame(animateSorting);
    if(moves_required_to_sort_array.length===0)
    {
        SortingBtn.disabled=false;
        if(is_array_sorted)
        {
            SortingBtn.textContent="Sorted"; 
            document.getElementById("no_of_swaps").textContent="No of Swaps Done are: " +no_of_swaps_done; 
            document.getElementById("no_of_swaps").classList.remove("HideSwaps");
        }
        else
        {
            SortingBtn.textContent="Start Sorting";
        }
    }
}