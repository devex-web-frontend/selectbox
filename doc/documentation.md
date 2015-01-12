#Index

**Classes**

* [class: Selectbox](#Selectbox)
  * [new Selectbox(select)](#new_Selectbox)
  * [Selectbox.disable(HTMLNode)](#Selectbox.disable)
  * [Selectbox.enable(HTMLNode)](#Selectbox.enable)
  * [const: Selectbox.E_CREATED](#Selectbox.E_CREATED)
  * [const: Selectbox.E_CHANGED](#Selectbox.E_CHANGED)
  * [const: Selectbox.E_CHANGE_VALUE](#Selectbox.E_CHANGE_VALUE)

**Namespaces**

* [Selectbox](#Selectbox)
  * [Selectbox.disable(HTMLNode)](#Selectbox.disable)
  * [Selectbox.enable(HTMLNode)](#Selectbox.enable)
  * [const: Selectbox.E_CREATED](#Selectbox.E_CREATED)
  * [const: Selectbox.E_CHANGED](#Selectbox.E_CHANGED)
  * [const: Selectbox.E_CHANGE_VALUE](#Selectbox.E_CHANGE_VALUE)

**Events**

* [event: "selectbox:created"](#selectbox_created)
* [event: "selectbox:changed"](#selectbox_changed)
* [event: "selectbox:changevalue"](#selectbox_changevalue)

**Functions**

* [showDropDown()](#showDropDown)
* [hideDropDown()](#hideDropDown)
* [getText()](#getText)
* [getValue()](#getValue)
* [getBlock()](#getBlock)
* [getEventTarget()](#getEventTarget)
 
<a name="Selectbox"></a>
#class: Selectbox
**Members**

* [class: Selectbox](#Selectbox)
  * [new Selectbox(select)](#new_Selectbox)
  * [Selectbox.disable(HTMLNode)](#Selectbox.disable)
  * [Selectbox.enable(HTMLNode)](#Selectbox.enable)
  * [const: Selectbox.E_CREATED](#Selectbox.E_CREATED)
  * [const: Selectbox.E_CHANGED](#Selectbox.E_CHANGED)
  * [const: Selectbox.E_CHANGE_VALUE](#Selectbox.E_CHANGE_VALUE)

<a name="new_Selectbox"></a>
##new Selectbox(select)
Creates new selectbox component

**Params**

- select `HTMLSelectElement`  

<a name="Selectbox.disable"></a>
##Selectbox.disable(HTMLNode)
Disable selectbox

**Params**

- HTMLNode `Node` - containing select block  

<a name="Selectbox.enable"></a>
##Selectbox.enable(HTMLNode)
Enable selectbox

**Params**

- HTMLNode `Node` - containing select block  

<a name="Selectbox.E_CREATED"></a>
##const: Selectbox.E_CREATED
**Type**: `string`  
**Default**: `selectbox:created`  
<a name="Selectbox.E_CHANGED"></a>
##const: Selectbox.E_CHANGED
**Type**: `string`  
**Default**: `selectbox:changed`  
<a name="Selectbox.E_CHANGE_VALUE"></a>
##const: Selectbox.E_CHANGE_VALUE
**Type**: `string`  
**Default**: `selectbox:changevalue`  
<a name="Selectbox"></a>
#Selectbox
**Copyright**: Devexperts  
**Members**

* [Selectbox](#Selectbox)
  * [Selectbox.disable(HTMLNode)](#Selectbox.disable)
  * [Selectbox.enable(HTMLNode)](#Selectbox.enable)
  * [const: Selectbox.E_CREATED](#Selectbox.E_CREATED)
  * [const: Selectbox.E_CHANGED](#Selectbox.E_CHANGED)
  * [const: Selectbox.E_CHANGE_VALUE](#Selectbox.E_CHANGE_VALUE)

<a name="Selectbox.disable"></a>
##Selectbox.disable(HTMLNode)
Disable selectbox

**Params**

- HTMLNode `Node` - containing select block  

<a name="Selectbox.enable"></a>
##Selectbox.enable(HTMLNode)
Enable selectbox

**Params**

- HTMLNode `Node` - containing select block  

<a name="Selectbox.E_CREATED"></a>
##const: Selectbox.E_CREATED
**Type**: `string`  
**Default**: `selectbox:created`  
<a name="Selectbox.E_CHANGED"></a>
##const: Selectbox.E_CHANGED
**Type**: `string`  
**Default**: `selectbox:changed`  
<a name="Selectbox.E_CHANGE_VALUE"></a>
##const: Selectbox.E_CHANGE_VALUE
**Type**: `string`  
**Default**: `selectbox:changevalue`  
<a name="selectbox_created"></a>
#event: "selectbox:created"
Triggers when electbox is created

<a name="selectbox_changed"></a>
#event: "selectbox:changed"
Triggers when selectbox is changed

<a name="selectbox_changevalue"></a>
#event: "selectbox:changevalue"
Should be fired after external select index change

<a name="showDropDown"></a>
#showDropDown()
Show dropdown

<a name="hideDropDown"></a>
#hideDropDown()
Hide dropdown

<a name="getText"></a>
#getText()
Get current label

**Returns**: `String`  
<a name="getValue"></a>
#getValue()
Get current value

**Returns**: `Number` | `String`  
<a name="getBlock"></a>
#getBlock()
Get HTMLNode containing selectbox

**Returns**: `Node`  
<a name="getEventTarget"></a>
#getEventTarget()
Get element which listens to events

**Returns**: `Node`  
